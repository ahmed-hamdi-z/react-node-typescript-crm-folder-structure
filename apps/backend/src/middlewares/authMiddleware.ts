import express from 'express';
import jwt from 'jsonwebtoken';
import { merge } from 'lodash';

import { InvalidTokenError, AccessDeniedError, UserNotFoundError } from '../utils/errors/AuthErrors';
import { getUserById, getUserByRole, getUserBySessionToken } from '../models/auth/users';

const AUTH_COOKIE = process.env.AUTH_COOKIE_SESSION_TOKEN! || 'click-crm-auth-cookie-for-session-token';
const JWT_SECRET = process.env.JWT_SECRET_TOKEN! || 'secret';

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
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}


export const checkRoles = (allowedRoles: string) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies[AUTH_COOKIE];
  if (!token) {
    throw new InvalidTokenError();
  }

  console.log(token)
  try {
   const { id } = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await getUserById(id);
    console.log(user)
    if (user?.role == allowedRoles) {
      next();
    }
    throw new AccessDeniedError('Access denied');
  } catch (error) {
    console.log(error);
    if (error instanceof AccessDeniedError) {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};