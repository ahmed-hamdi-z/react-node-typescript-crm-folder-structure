import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InvalidTokenError, AccessDeniedError } from '../utils/errors/AuthErrors';

// Verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {

  const jwtSecret = process.env.JWT_SECRET!;

    try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new InvalidTokenError();
      }
      const decoded = jwt.verify(token, jwtSecret as string) as { id: string; role: string };
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
export const checkRole = (role: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Ensure req.userRole is defined
    // @ts-ignore
    if (!req.userRole) {
      throw new AccessDeniedError('User role not found');
    }
    // If role is an array, check if userRole matches any of the roles
    if (Array.isArray(role)) {
      // @ts-ignore
      if (!role.includes(req.userRole)) {
        throw new AccessDeniedError('You do not have the required role');
      }
    }
    // If role is a string, check if userRole matches the role
    else {
      // @ts-ignore
      if (req.userRole !== role) {
        throw new AccessDeniedError('You do not have the required role');
      }
    }
    // If the role check passes, proceed to the next middleware
    next();
  };
};