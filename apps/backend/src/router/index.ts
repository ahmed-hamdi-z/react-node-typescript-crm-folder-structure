import express from 'express'; 

import authRoutes from './authRoutes';
import protectedRoutes from './protectedRoutes';

const router = express.Router();    

export default (): express.Router => {
    authRoutes(router);
    protectedRoutes(router);
    return router;
}