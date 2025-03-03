import express from 'express';
import jwt from 'jsonwebtoken';

import {
  InvalidCredentialsError,
  AuthError,
  UserNotFoundError,
  LogoutFailedError,
} from '../utils/errors/AuthErrors';

import { createUser, getUserByEmail } from '../models/auth/users';
import { authentication, randomString } from '../helpers';

import { isExists } from '../middlewares/authMiddleware';

const AUTH_COOKIE = process.env.AUTH_COOKIE_SESSION_TOKEN! || 'click-crm-auth-cookie-for-session-token';
const JWT_SECRET = process.env.JWT_SECRET_TOKEN! || 'secret';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username) {
      throw new AuthError('Email, password, and username are required');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new AuthError('User already exists');
    }

    const salt = randomString();
    const user = await createUser({
      email,
      username, 
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      role,
    });

    res.status(201).json({user: user }).end();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AuthError('Email and password are required');
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password +role');
    if (!user) {
      throw new UserNotFoundError();
    }

    const isMatchHash = await authentication(user.authentication.salt, password);
    if (user.authentication.password !== isMatchHash) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    user.authentication.sessionToken = token;
    await user.save();

    res.cookie(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      domain: 'localhost',
      path: '/',
    });

    res.status(200).json({ user, token }).end();
    
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const existingUser = await isExists(req);

    existingUser.authentication.sessionToken = null;
    await existingUser.save();

    res.clearCookie(AUTH_COOKIE, {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV! === 'production',
      sameSite: 'strict',
      domain: process.env.NODE_ENV! === 'production' ? 'your-production-domain.com' : 'localhost',
      path: '/',
    });

    res.status(200).json({ message: 'Logout successful' }).end();
  } catch (error) {
    console.error('Logout failed:', error);

    if (error instanceof UserNotFoundError) {
      res.status(404).json({ error: 'User not found' });
    } else if (error instanceof LogoutFailedError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Logout failed due to an internal error' });
    }
  }
};