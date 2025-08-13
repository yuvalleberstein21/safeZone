import express from 'express';
import {
  isAdmin,
  isAuthenticated,
  isManagerOrAdmin,
} from '../middlewares/authMiddleware';
import {
  deleteUser,
  getAdminDashboardData,
} from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', isAuthenticated, isAdmin, getAdminDashboardData);
router.delete('/:id', isAuthenticated, isManagerOrAdmin, deleteUser);

export default router;
