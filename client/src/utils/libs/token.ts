import { GetServerSidePropsContext } from "next";
import Cookies from "cookies";
import cookie from "js-cookie";

import { COOKIE_ACCESS_TOKEN_KEY } from "constants/cookie";

const isServer = typeof window === "undefined";

export const getToken = (
  ctx?: GetServerSidePropsContext
): string | undefined => {
  if (isServer && ctx) {
    const { req, res } = ctx;

    const serverSideCookie = new Cookies(req, res);

    return serverSideCookie.get(COOKIE_ACCESS_TOKEN_KEY);
  }

  return cookie.get(COOKIE_ACCESS_TOKEN_KEY);
};

export const setToken = (token: string): void => {
  cookie.set(COOKIE_ACCESS_TOKEN_KEY, token);
};

export const removeToken = (ctx?: GetServerSidePropsContext): void => {
  if (isServer && ctx) {
    const { req, res } = ctx;

    const serverSideCookie = new Cookies(req, res);

    serverSideCookie.set(COOKIE_ACCESS_TOKEN_KEY, "", {
      expires: new Date(),
    });
  } else {
    cookie.remove(COOKIE_ACCESS_TOKEN_KEY);
  }
};
