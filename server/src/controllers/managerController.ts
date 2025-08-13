import { Request, Response } from 'express';
import { getManagerEmployees } from '../models/userModel';

export const getUsersForManager = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const users = await getManagerEmployees(req.user.id);
    res.json(users);
  } catch (error) {
    console.error('Get manager employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
