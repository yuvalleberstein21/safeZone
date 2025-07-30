import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController';
import { validateRegister } from '../middlewares/validateRegister';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/me', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

export default router;
