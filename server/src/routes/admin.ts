import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController';

import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware';
import { getAdminDashboardData } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', isAuthenticated, isAdmin, getAdminDashboardData);

export default router;
