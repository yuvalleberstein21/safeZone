import express from 'express';
import { createReport, getAllReports } from '../controllers/reportsController';
import { reportValidator } from '../validators/reportValidator';
import {
  isAuthenticated,
  isEmployee,
  isManager,
} from '../middlewares/authMiddleware';

const router = express.Router();

// יצירת דיווח
router.post('/', isAuthenticated, isEmployee, reportValidator, createReport);

// שליפת כל הדיווחים (רק למנהלים למשל)
router.get('/', isAuthenticated, isManager, getAllReports);

export default router;
