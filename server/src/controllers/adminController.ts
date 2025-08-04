import { Request, Response } from 'express';
import { getAllAlerts } from '../models/alertModel';
import { getRecentReports } from '../models/reportsModel';
import { getAllUsers } from '../models/userModel';

export const getAdminDashboardData = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    const alerts = await getAllAlerts();

    res.status(200).json({ users, alerts });
  } catch (error) {
    console.error('Failed to fetch admin dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
