import express from 'express';
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from '../controllers/authController';
import { validateRegister } from '../middlewares/validateRegister';
import {
  isAuthenticated,
  isManagerOrAdmin,
} from '../middlewares/authMiddleware';

const router = express.Router();

router.post(
  '/register',
  validateRegister,
  isAuthenticated,
  isManagerOrAdmin,
  registerUser
);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/me', isAuthenticated, (req, res) => {
  res.json(req.user);
});

// שליחת קישור לאיפוס סיסמה
router.post('/forgot-password', forgotPassword);

// איפוס סיסמה בפועל
router.post('/reset-password', resetPassword);

export default router;
