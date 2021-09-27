import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";

import Header from "components/Header";

import { GlobalStyles } from "styles/globalStyles";
import { theme } from "styles/theme";

import { useApollo } from "utils/libs/apollo-client";
import "styles/fonts.css";

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
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
