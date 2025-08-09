import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getReportsWithUserInfo, insertReport } from '../models/reportsModel';
import { Report } from '../types/report';
import pool from '../db/db';

export const createReport = async (
  req: Request,
  res: Response
): Promise<Report | undefined> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const userId = req.user!.id;

  const { is_safe, latitude, longitude, reason, image_url, area } =
    req.body as Report;

  try {
    const newReport = await insertReport({
      user_id: userId,
      is_safe,
      latitude,
      longitude,
      reason,
      image_url,
      area,
    });

    // ⚠️ אם הדיווח הוא לא בטוח – ניצור התראה
    if (!is_safe) {
      await pool.query(
        `INSERT INTO alerts (report_id, status) VALUES ($1, 'pending')`,
        [newReport.id]
      );
    }

    res.status(201).json({ message: 'Report created', report: newReport });
    return;
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const getAllReports = async (
  req: Request,
  res: Response
): Promise<Report | undefined> => {
  try {
    const managerId = req.user!.id;
    const reports: Report[] = await getReportsWithUserInfo(managerId);
    res.json({ reports });
    return;
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};
