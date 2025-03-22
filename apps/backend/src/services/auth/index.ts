import VerificationCodeModel from "../../models/auth/verification.code.model";
import UserModel from "../../models/auth/user.model";
import verificationCodeType from "../../constants/verification.code";
import { One_Day, oneYearFromNow } from "../../utils/date";
import SessionModel from "../../models/auth/session.model";
import AppAssert from "../../utils/auth/assert";
import { CONFLICT, UNAUTHORIZED } from "../../constants/http";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../../utils/jwt";

export type createAccountParams = {
  email: string;
  password: string;
  userAgent: string;
  role: string;
};

export const createAccount = async (data: createAccountParams) => {
  // verify user
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  AppAssert(!existingUser, CONFLICT, "User already exists");
  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
    role: data.role,
  });
  // create verification code
  const userId = user._id;
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: verificationCodeType.VerifyEmail,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access token and refresh token
  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent: string;
  role: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
  role,
}: LoginParams) => {
  // finde user by email
  const user = await UserModel.findOne({ email });
  AppAssert(user, UNAUTHORIZED, "Inbalid email or password");

  // compare password
  const isValidPassword = await user.comparePassword(password);
  AppAssert(isValidPassword, UNAUTHORIZED, "Inbalid email or password");

  const userId = user._id;

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });
  const sessionInfo = {
    sessionId: session._id,
  };

  // sign access token and refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId,
  });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  // verify refresh token
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  AppAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();

  AppAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  // refresh session if it expires in the next 24 hours
  const sessionRefreshed = session.expiresAt.getTime() - now <= One_Day;
  if (sessionRefreshed) {
    session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await session.save();
  }

  const newRefreshToken = sessionRefreshed
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};
