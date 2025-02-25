import 'express';

declare global {
    namespace Express {
        interface Request {
            cookies?: any;
            userRole?: string; // Example of extending with custom properties
        }
    }
}