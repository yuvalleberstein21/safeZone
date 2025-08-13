import express from 'express';
import { isAuthenticated, isManager } from '../middlewares/authMiddleware';
import { getUsersForManager } from '../controllers/managerController';

const router = express.Router();

router.get('/users', isAuthenticated, isManager, getUsersForManager);

export default router;
