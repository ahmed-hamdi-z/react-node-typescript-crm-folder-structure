import express from 'express';

import {  checkRole, isAuthenticated } from '../middlewares/authMiddleware';
import { getAllUsers, getCurrentUser } from '../controllers/protectedController';

export default (router: express.Router) => {
    router.get('/user/:id', isAuthenticated, getCurrentUser);
    router.get('/users', isAuthenticated, checkRole('admin'), getAllUsers);
};