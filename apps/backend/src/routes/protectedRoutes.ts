import { Router } from 'express';
import { verifyToken, checkRole } from '../middleware/authMiddleware';
import { getProfile, getAdminPage, getUserPage } from '../controllers/protectedController';

const router = Router();

router.get('/profile', verifyToken, getProfile);
router.get('/admin', verifyToken, checkRole('admin'), getAdminPage);
router.get('/user', verifyToken, checkRole('user'), getUserPage);

export default router;