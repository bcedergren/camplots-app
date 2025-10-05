import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPasswordController,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPasswordController);

export default router;
