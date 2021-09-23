import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "styles/globalStyles";
import { theme } from "styles/theme";

import { ApolloProvider } from "@apollo/client";

import "styles/fonts.css";
import { useApollo } from "utils/libs/apollo-client";

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .catch((err) => {
          console.error("Service worker registration failed", err);
        });
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
