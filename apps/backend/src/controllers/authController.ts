import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  InvalidCredentialsError,
  AuthError,
  UserNotFoundError,
  LogoutFailedError,
} from '../utils/errors/AuthErrors';
import { loginSchema, User, userSchemaZod } from '../models/auth/userSchemas';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const result = userSchemaZod.safeParse(req.body);
    if (!result.success) {
      throw new AuthError('Invalid registration data');
    }

    const { username, email, password, role, } = result.data;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new AuthError('User already exists');
    }
    const _id = uuidv4();
    // Create a new user
    const user = new User({ _id, ...result.data, password: await bcrypt.hash(password, 10) });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
};

// Login a user
export const login = async (req: Request, res: Response): Promise<void> => {
  const jwtSecret = process.env.JWT_SECRET!;

  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      throw new AuthError('Invalid login data');  // Handle invalid data
    }

    const { email, password } = result.data;
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      throw new UserNotFoundError();
    }

    const isMatch = await bcrypt.compare(password, user.password);    // Compare passwords
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret as string, { expiresIn: '1h' });

    // Update the user document with the new token
    user.token = token;
    await user.save();

    res.cookie('token', token, { httpOnly: true }); // Generate JWT token
    // @ts-ignore
    req.session.userId = user._id;

    // Send response with token and userId
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      userId: user._id,
    });

  } catch (error: unknown) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      throw new AuthError('Failed to login');
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





