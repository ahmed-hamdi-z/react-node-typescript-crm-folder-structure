import { Request, Response, NextFunction } from 'express';
import {
  AuthError,
  UserNotFoundError,
  InvalidCredentialsError,
  AccessDeniedError,
  InvalidTokenError,
  LogoutFailedError,
} from '../utils/errors/AuthErrors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AuthError) {
    switch (err.constructor) {
      case UserNotFoundError:
        res.status(404).json({ error: err.message });
        break;
      case InvalidCredentialsError:
        res.status(401).json({ error: err.message });
        break;
      case AccessDeniedError:
        res.status(403).json({ error: err.message });
        break;
      case InvalidTokenError:
        res.status(401).json({ error: err.message });
        break;
      case LogoutFailedError:
        res.status(500).json({ error: err.message });
        break;
      default:
        res.status(400).json({ error: err.message });
    }
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};