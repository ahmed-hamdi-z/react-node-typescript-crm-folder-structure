import express from 'express';

import {  checkRoles, isAuthenticated } from '../middlewares/authMiddleware';
import { deleteUser, getAllUsers, getUser } from '../controllers/protectedController';

export default (router: express.Router) => {
    router.get('/user/:id', isAuthenticated, getUser);
    router.get('/users',  checkRoles('admin'), getAllUsers);
    router.delete('/delete/user/:id', isAuthenticated, checkRoles('admin'), deleteUser);
};