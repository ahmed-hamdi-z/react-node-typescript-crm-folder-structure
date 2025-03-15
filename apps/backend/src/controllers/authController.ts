import express from 'express';
import jwt from 'jsonwebtoken';

import { createUser, getUserByEmail } from '../models/auth/user.model';
import { authentication, randomString } from '../helpers';

import { isExists } from '../middlewares/authMiddleware';
import { AUTH_COOKIE, JWT_SECRET } from '../constants/env';
import { FailedError, HandelErrors, Invalid, NotFound } from '../utils/errors/Errors';

/**
 * Registers a new user by creating a user record in the database.
 * - Validates the request body to ensure email, password, and username are provided.
 * - Checks for an existing user with the same email and throws an error if found.
 * - Generates a random salt and hashes the password using the salt.
 * - Creates a new user with the provided email, username, hashed password, and role.
 * - Responds with the created user object upon successful registration.
 * - Handles errors by sending appropriate HTTP responses.
 * @param req - Express request object containing user registration details in the body.
 * @param res - Express response object used to send a response back to the client.
 */
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username) {
      throw new HandelErrors('Email, password, and username are required');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new HandelErrors('User already exists');
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
    if (error instanceof HandelErrors) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
};
/**
 * Authenticates a user by verifying their email and password.
 * - Validates the request body to ensure email and password are provided.
 * - Retrieves the user by email and includes necessary fields for authentication.
 * - Throws an error if the user is not found or the credentials are invalid.
 * - Creates a JSON Web Token (JWT) for the authenticated user with a 1-hour expiration.
 * - Saves the session token to the user's record and sets a secure cookie for authentication.
 * - Responds with the user object and token upon successful login.
 * @param req - Express request object containing the user's email and password in the body.
 * @param res - Express response object used to send a response back to the client.
 */
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new HandelErrors('Email and password are required');
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password +role');
    if (!user) {
      throw new NotFound('cannot find user by email');
    }

    const isMatchHash = await authentication(user.authentication.salt, password);
    if (user.authentication.password !== isMatchHash) {
      throw new Invalid('Invalid credentials');
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
    if (error instanceof HandelErrors) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  }
};
/**
 * Logs out a user by clearing the authentication cookie and removing the
 * session token from the user document in the database.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @throws {UserNotFoundError} If the user is not found.
 * @throws {LogoutFailedError} If the logout fails.
 * @throws {Error} If an internal error occurs.
 */
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

    if (error instanceof NotFound) {
      res.status(404).json({ error: 'User not found' });
    } else if (error instanceof FailedError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Logout failed due to an internal error' });
    }
  }
};