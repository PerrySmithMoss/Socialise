import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createTheme } from "@material-ui/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessKey, setAccessKey } from "../auth/accessKey";
import { createUploadLink } from "apollo-upload-client";
import { HttpLink } from "apollo-link-http";
import Navbar from "../components/Navbar";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: "ws://localhost:5000/subscriptions",
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

const httplink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

let uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessKey();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessKey();
    if (!token) {
      return true;
    }

    try {
      const jwt: any = jwtDecode(token);
      if (Date.now() >= jwt.exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log("Error here...");
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    setAccessKey(accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to re-login");
    console.log(err);
  },
});

uploadLink = authLink.concat(uploadLink).concat(tokenRefreshLink);

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
    : httplink;

const client = new ApolloClient({
  // link: from([
  //   tokenRefreshLink,
  //   authLink,
  //   // httpLink,
  //   uploadLink
  // ]),
  link: splitLink as any,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <ApolloProvider client={client as any}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <AnyComponent {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
