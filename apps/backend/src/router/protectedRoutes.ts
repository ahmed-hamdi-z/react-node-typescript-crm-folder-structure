import express from 'express';

import { checkRoles, isAuthenticated, isOwner } from '../middlewares/authMiddleware';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/protectedController';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, checkRoles('admin'), getAllUsers);
    router.get('/user/:id', isAuthenticated, isOwner, getUser);
    router.patch('/user/update/:id', isAuthenticated, isOwner, updateUser);
    router.delete('/user/delete/:id', isAuthenticated, isOwner, deleteUser);
};      