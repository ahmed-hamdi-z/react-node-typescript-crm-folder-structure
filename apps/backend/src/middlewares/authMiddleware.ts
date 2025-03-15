import express from 'express';
import jwt from 'jsonwebtoken';
import { get, merge } from 'lodash';

import { getUserById, getUserBySessionToken } from '../models/auth/user.model';
import { AUTH_COOKIE, JWT_SECRET } from '../constants/env';
import { AccessDenied, BadRequest, Forbidden, Invalid, NotFound, Unauthorized } from '../utils/errors/Errors';

/**
 * Checks if a user exists in the database by checking the session token
 * passed in the Authorization header.
 * @param {express.Request} req - The Express request object.
 * @throws {InvalidTokenError} If the session token is invalid or missing.
 * @returns {Promise<User>} The user document if it exists, otherwise throws an error.
 */
export const isExists = async (req: express.Request) => {
  const sessionToken = req.cookies[AUTH_COOKIE];
  if (!sessionToken) {
    throw new Invalid('Missing session token');
  }
  const existingUser = await getUserBySessionToken(sessionToken);
  if (!existingUser) {
    throw new NotFound('Cannot find user by session token');
  }

  return existingUser;
}
/**
 * Middleware to authenticate a user by verifying their session token.
 * - Calls the isExists function to check if a user exists based on the session token.
 * - Merges the user information into the request object under the `identity` field.
 * - Proceeds to the next middleware if authentication is successful.
 * - Handles errors by sending appropriate HTTP responses, such as 401 for invalid tokens.
 * @param req - Express request object containing cookies with the session token.
 * @param res - Express response object used to send error responses if authentication fails.
 * @param next - Express next function to call the next middleware in the stack.
 * @throws {InvalidTokenError} If the session token is invalid or missing.
 * @throws {Error} For internal server errors.
 */
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const existingUser = await isExists(req);
    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof Unauthorized) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
/**
 * Middleware to check if the authenticated user is the owner of the resource.
 * - Retrieves the user ID from the request params and the current user ID from the request identity.
 * - Throws an error if the current user ID is not found or does not match the provided ID.
 * - Proceeds to the next middleware if the user is the owner.
 * - Handles errors by sending appropriate HTTP responses, such as 400 for invalid tokens.
 * @param req - Express request object containing the user ID in the params.
 * @param res - Express response object used to send error responses if ownership checks fail.
 * @param next - Express next function to call the next middleware in the stack.
 * @throws {UserNotFoundError} If the current user ID does not match the provided ID.
 * @throws {InvalidTokenError} If the token is invalid or missing.
 */
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      throw new NotFound('User id not found');
    }
    if (currentUserId.toString() !== id) {
      throw new NotFound('User id not found');
    }
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof BadRequest) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
/**
 * Middleware to check if the authenticated user has the required role(s) to access a route.
 * - Extracts the session token from the request cookies.
 * - Verifies the token and retrieves the user's role from the database.
 * - Compares the user's role with the allowed role(s) specified.
 * - Proceeds to the next middleware if the user has the required role(s).
 * - Sends an appropriate HTTP response if access is denied or if an error occurs.
 * @param allowRole - A string or an array of strings representing the allowed role(s) for the route.
 * @returns An Express middleware function that checks the user's role
 * @throws {InvalidTokenError} If the session token is invalid or missing.
 * @throws {UserNotFoundError} If the user does not exist in the database.
 * @throws {AccessDeniedError} If the user does not have the required role(s).
 */
export const checkRoles = (allowRole: string | string[]) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.cookies[AUTH_COOKIE];
  if (!authHeader) {
    throw new Invalid('Token not found');
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
    const user = await getUserById(decodedToken.id);
    if (!user) {
      throw new NotFound('User not found');
    }

    if (allowRole.includes(user.role)) {
      next();
    } else {
      throw new AccessDenied('Access Denied');
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Forbidden) {
      res.status(403).json({ error: error.message });
    } else if (error instanceof Unauthorized) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};