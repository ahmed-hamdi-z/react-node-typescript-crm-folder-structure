import express from "express";
import catchErrors from "../../utils/auth/catchErrors";
import { registerSchema, loginSchema } from "../../schemas/auth";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from "../../services/auth";
import { CREATED, OK, UNAUTHORIZED } from "../../constants/http";
import {
  clearAuthCookies,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../../utils/cookies";
import { verifyToken } from "../../utils/jwt";
import SessionModel from "../../models/auth/session.model";
import AppAssert from "../../utils/auth/assert";

export const register = catchErrors(
  async (req: express.Request, res: express.Response) => {
    // validate rquest
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });
    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response
    setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED)
      .json({ user });
  }
);

export const login = catchErrors(
  async (req: express.Request, res: express.Response) => {
    const request = loginSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // call service
    const { user, accessToken, refreshToken } = await loginUser(request);

    // return response
    setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
      message: "Login success",
    });
  }
);

export const logout = catchErrors(
  async (req: express.Request, res: express.Response) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    const { payload } = verifyToken(accessToken || "");

    if (payload) {
      await SessionModel.findOneAndDelete(payload.sessionId);
    }

    clearAuthCookies(res).status(OK).json({ message: "Logout success" });
  }
);

export const refreshHandler = catchErrors(
  async (req: express.Request, res: express.Response) => {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    AppAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const { accessToken, newRefreshToken } = await refreshUserAccessToken(
      refreshToken
    );

    if (newRefreshToken) {
      res.cookie(
        "refreshToken",
        newRefreshToken,
        getRefreshTokenCookieOptions()
      );
    }

    res
      .status(OK)
      .cookie("accessToken", accessToken, getRefreshTokenCookieOptions())
      .json({
        message: "access token refreshed",
      });
  }
);
