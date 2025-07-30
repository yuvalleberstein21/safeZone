import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { insertReport } from '../models/reportsModel';

export const createReport = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { is_safe, latitude, longitude, reason, image_url, area, shift_id } =
    req.body;

  try {
    const newReport = await insertReport({
      user_id: userId,
      is_safe,
      latitude,
      longitude,
      reason,
      image_url,
      area,
      shift_id,
    });

    return res
      .status(201)
      .json({ message: 'Report created', report: newReport });
  } catch (error) {
    console.error('Error creating report:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
