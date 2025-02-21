import { Request, Response } from 'express';

// Protected profile route
export const getProfile = (req: Request, res: Response): void => {
  res.send('Profile page');
};

// Admin-only route
export const getAdminPage = (req: Request, res: Response): void => {
  res.send('Admin page');
};

// User-only route
export const getUserPage = (req: Request, res: Response): void => {
  res.send('User page');
};