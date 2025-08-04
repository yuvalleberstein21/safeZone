import pool from '../db/db';
import { Alert } from '../types/alert';

export const getAllAlerts = async (): Promise<Alert[]> => {
  const result = await pool.query(`
      SELECT alerts.*, reports.*, users.name AS reporter_name, users.area
      FROM alerts
      JOIN reports ON alerts.report_id = reports.id
      JOIN users ON reports.user_id = users.id
      ORDER BY alerts.updated_at DESC
    `);
  return result.rows;
};
