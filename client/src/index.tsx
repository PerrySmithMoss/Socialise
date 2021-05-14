import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessKey, setAccessKey } from "./auth/accessKey";
import { createUploadLink } from "apollo-upload-client";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

// Might not have to use this link anymore..?
// const httpLink = createHttpLink({
//   uri: "http://localhost:5000/graphql",
//   credentials: "include",
// });

// const authToken = getAccessKey();

const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem("habit")
        ? `Bearer ${localStorage.getItem("habit")}`
        : "",
    },
  },
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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadLink
);

const client = new ApolloClient({
  // link: from([
  //   tokenRefreshLink,
  //   authLink,
  //   // httpLink,
  //   uploadLink
  // ]),
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
