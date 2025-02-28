import { User } from '../models/auth/users';

declare global {
  namespace Express {
    interface Request {
      identity?: User; // Add the `identity` property to the Request type
    }
  }
}