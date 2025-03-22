import express from 'express'; 

import authRoutes from './auth/auth.route';
import protectedRoutes from './auth/protected.route';

const router = express.Router();    

export default (): express.Router => {
    authRoutes(router);
    protectedRoutes(router);
    return router;
}