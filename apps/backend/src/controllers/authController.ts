import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/auth/userSchemas';

import {
  InvalidCredentialsError,
  LogoutFailedError,
  AuthError, 
  UserNotFoundError,
} from '../utils/errors/AuthErrors';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, role = 'user' } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).send('User registered');
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      // Handle other types of errors
    }
  }
};

// Login a user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new UserNotFoundError();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    // @ts-ignore
    req.session.userId = user._id;
    res.send('Logged in');
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } 
  }
};

// Logout a user
export const logout = (req: Request, res: Response): void => {
  try {
    res.clearCookie('token');
    req.session.destroy((err) => {
      if (err) {
        throw new LogoutFailedError();
      }
      res.send('Logged out');
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } 
  }
};