import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createTheme } from "@material-ui/core";
import {
  ApolloProvider,
} from "@apollo/client";
import { withApollo } from "../lib/apollo";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function MyApp({ Component, pageProps, apolloClient }: any) {
  const AnyComponent = Component as any;
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnyComponent {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default withApollo(MyApp);
