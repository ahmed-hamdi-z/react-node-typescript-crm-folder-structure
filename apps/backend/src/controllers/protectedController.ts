import { Request, Response } from 'express';

import { AuthError, UserNotFoundError } from '../utils/errors/AuthErrors';

import { User } from '../models/auth/userSchemas';

// Protected profile route
export const getProfile = (req: Request, res: Response): void => {
  res.send('Profile page');
};

// Admin-only route
export const getAdminPage = (req: Request, res: Response): void => {
  res.send('Admin page');
};

// User-only route

export const getUserPage = async (req: Request, res: Response) => {
  try {
    // Get the user ID from the session
    const userId = req.session.id; // Assuming the session stores the user ID
    if (!userId) {
      throw new AuthError("User not authenticated");
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    } 

    // Return the user data (excluding sensitive information like password)
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(401).json({ error: error.message });
    } else {
      console.error("Failed to fetch current user:", error);
      res.status(500).json({ error: "Failed to fetch current user" });
    }
  }
};
