import { Request, Response } from 'express';
import { getAllAlerts } from '../models/alertModel';
import { deleteUserById, findUserById, getAllUsers } from '../models/userModel';

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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const targetUserId = parseInt(req.params.id, 10);

    const targetUser = await findUserById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }

    const requesterRole = req.user?.role;
    const requesterId = req.user?.id;

    // לוגיקת הרשאות למחיקה
    if (requesterRole === 'manager') {
      if (targetUser.role !== 'employee') {
        return res
          .status(403)
          .json({ message: 'manager יכול למחוק עובדים בלבד!' });
      }
      if (targetUser.manager_id !== requesterId) {
        return res.status(403).json({
          message: 'manager יכול למחוק רק משתמשים השייכים לו בלבד.',
        });
      }
    }

    // מחיקה
    await deleteUserById(targetUserId);

    res.status(200).json({ message: 'משתמש נמחק בהצלחה' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
