import express from 'express';

import { register, login, logout, refreshHandler } from '../../controllers/auth/auth.controllers';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/logout', logout);
    router.get('/auth/refresh', refreshHandler);
};