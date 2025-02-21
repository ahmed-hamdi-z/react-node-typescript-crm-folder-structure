import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InvalidTokenError, AccessDeniedError } from '../utils/errors/AuthErrors';

// Verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    throw new InvalidTokenError();
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key') as { id: string; role: string };
    // @ts-ignore
    req.userId = decoded.id;
    // @ts-ignore
    req.userRole = decoded.role;
    next();
  } catch (error) {
    throw new InvalidTokenError();
  }
};

// Check user role
export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // @ts-ignore
    if (req.userRole !== role) {
      throw new AccessDeniedError();
    }
    next();
  };
};