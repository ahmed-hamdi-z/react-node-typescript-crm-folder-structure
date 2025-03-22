import express, { CookieOptions } from "express";

type AuthCookiesParams = {
  res: express.Response;
  accessToken: string;
  refreshToken: string;
};

const secure = process.env.NODE_ENV! !== "development";
const RefreshPath = "/auth/refresh";

const defaultsCookieOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultsCookieOptions,
  expires: new Date(Date.now() + 15 * 60 * 1000),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultsCookieOptions,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  path: RefreshPath,
});

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: AuthCookiesParams) => 
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: express.Response) =>
  res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: RefreshPath,
  });