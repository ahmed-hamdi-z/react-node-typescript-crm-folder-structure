import express from 'express';
import jwt from 'jsonwebtoken';
import { merge } from 'lodash';

import { InvalidTokenError, AccessDeniedError, UserNotFoundError } from '../utils/errors/AuthErrors';
import { getUserById, getUserBySessionToken } from '../models/auth/users';

const AUTH_COOKIE = process.env.AUTH_COOKIE_SESSION_TOKEN || 'click-crm-auth-cookie-for-session-token';
const JWT_SECRET = process.env.JWT_SECRET_TOKEN || 'secret';

export const isExists = async (req: express.Request) => {
  const sessionToken = req.cookies[AUTH_COOKIE];
  if (!sessionToken) {
    throw new InvalidTokenError();
  }
  const existingUser = await getUserBySessionToken(sessionToken);
  if (!existingUser) {
    throw new InvalidTokenError();
  }

  return existingUser;
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const existingUser = await isExists(req);
    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidTokenError) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export const checkRoles = (allowRole: string | string[]) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.cookies[AUTH_COOKIE];
  if (!authHeader) {
    throw new InvalidTokenError();
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
    const user = await getUserById(decodedToken.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.role === allowRole) {
      next();
    } else {
      throw new AccessDeniedError('Access Denied');
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AccessDeniedError) {
      res.status(403).json({ error: error.message });
    } else if (error instanceof InvalidTokenError) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};