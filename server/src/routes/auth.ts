import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
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

export default router;
