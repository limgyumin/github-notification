import { GetServerSidePropsContext } from "next";
import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import Cookies from "cookies";
import cookie from "js-cookie";

import config from "config/config.json";
import { COOKIE_ACCESS_TOKEN_KEY } from "constants/cookie";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const isServer = typeof window === "undefined";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (
  ctx?: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> => {
  const getToken = (): string | undefined => {
    if (isServer && ctx) {
      const serverSideCookie = new Cookies(ctx.req, ctx.res);

      return serverSideCookie.get(COOKIE_ACCESS_TOKEN_KEY);
    }

    return cookie.get(COOKIE_ACCESS_TOKEN_KEY);
  };

  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: config.URI,
      credentials: "same-origin",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  initialState = null,
  ctx?: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (
  pageProps: any
): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
