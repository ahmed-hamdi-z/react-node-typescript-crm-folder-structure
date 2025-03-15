import {Request, NextFunction, Response } from 'express';
import {
  HandelErrors,
  NotFound,
  Unauthorized,
  Forbidden,
  Conflict,
  UnprocessableContent,
  BadRequest,
  OK,
  AccessDenied,
  Invalid,
  FailedError,
  Created,
} from '../utils/errors/Errors';


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  
  if (err instanceof HandelErrors) {
    switch (err.constructor) {
      case AccessDenied:
        res.status(403).json({ error: err.message });
        break;
      case Invalid:
        res.status(401).json({ error: err.message });
        break;
      case FailedError:
        res.status(500).json({ error: err.message });
        break;
        case OK:
          res.status(200).json({ error: err.message });
          break;
        case Created:
          res.status(201).json({ error: err.message });
          break;
        case NotFound:
          res.status(404).json({ error: err.message });
          break;
        case Unauthorized:
          res.status(401).json({ error: err.message });
          break;
        case Forbidden:
          res.status(403).json({ error: err.message });
          break;
        case Conflict:
          res.status(409).json({ error: err.message });
          break;
        case UnprocessableContent:
          res.status(422).json({ error: err.message });
          break;
        case BadRequest:
          res.status(400).json({ error: err.message });
          break;
      default:
        res.status(400).json({ error: err.message });
    }
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
