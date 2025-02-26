import express from 'express';

import { get, merge } from 'lodash';

import { InvalidTokenError, AccessDeniedError, UserNotFoundError } from '../utils/errors/AuthErrors';
import { getUserByEmail, getUserByRole, getUserBySessionToken } from '../models/auth/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const AUTH_COOKIE_TOKEN = process.env.AUTH_COOKIE_TOKEN || 'click-crm-auth-cookie';

  try {
    const sessionToken = req.cookies[AUTH_COOKIE_TOKEN];

    if (!sessionToken) {
      throw new InvalidTokenError();
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      throw new InvalidTokenError();
    }

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

export const checkRole = (role: string) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    const isAdmin = getUserByRole(role);

    if (!isAdmin) {
      throw new AccessDeniedError();
    }
    merge(req, { identity: isAdmin });

    next();
  } catch (error) {
    console.log(error);
    if (error instanceof AccessDeniedError) {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};