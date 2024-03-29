import React from "react";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessKey, setAccessKey } from "../auth/accessKey";
import { createUploadLink } from "apollo-upload-client";
import { HttpLink } from "apollo-link-http";
import cookie from "cookie";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

import fetch from "isomorphic-unfetch";

const isServer = () => typeof window === "undefined";

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }: any) => {
    if (!isServer() && !getAccessKey()) {
      setAccessKey(serverAccessToken);
    }
    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (process.env.NODE_ENV !== "production") {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    // Warn if old way of installing apollo is used
    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx;

      let serverAccessToken = "";

      if (isServer()) {
        console.log("req.headers.cookie: ", req.headers.cookie);
        if (req.headers.cookie) {
          const cookies = cookie.parse(req.headers.cookie);
          if (cookies.habit) {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/refresh_token`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  cookie: "habit=" + cookies.habit,
                },
              }
            );
            const data = await response.json();
            serverAccessToken = data.accessToken;
          }
        }
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        // Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken,
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(initState: any, serverAccessToken?: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // setAccessToken(cookie.parse(document.cookie).test);
    apolloClient = createApolloClient(initState);
  }

  return apolloClient;
}

interface MyToken {
  name: string;
  exp: number;
  // whatever else is in the JWT.
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
function createApolloClient(initialState = {}, serverAccessToken?: string) {
  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessKey();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode<MyToken>(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refresh_token`, {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (accessToken) => {
      setAccessKey(accessToken);
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    },
  }) as any;

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessKey();
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log("graphQLErrors: ", graphQLErrors);
    console.log("networkError: ", networkError);
  });

  const wsLink =
    typeof window !== "undefined"
      ? new WebSocketLink({
          uri: `ws://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/subscriptions`,
          options: {
            reconnect: true,
            connectionParams: {
              authorization:
                typeof window !== "undefined"
                  ? localStorage.getItem("habit")
                  : typeof window !== "undefined"
                  ? `Bearer ${localStorage.getItem("habit")}`
                  : "",
            },
          },
        })
      : null;

  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
    credentials: "include",
    fetch
  });

  let uploadLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
    credentials: "include",
  });

  uploadLink = authLink.concat(uploadLink).concat(refreshLink);

  const splitLink =
    typeof window !== "undefined"
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink as WebSocketLink,
          uploadLink
        )
      : httpLink;

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: splitLink as any,
    cache: new InMemoryCache().restore(initialState),
  });
}
