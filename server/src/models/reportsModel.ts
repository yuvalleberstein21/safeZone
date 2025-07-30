import pool from '../db/db';
import { Report } from '../types/report';

export const insertReport = async (
  report: Omit<Report, 'id' | 'created_at' | 'updated_at' | 'timestamp'> & {
    user_id: number;
  }
) => {
  const query = `
    INSERT INTO reports (user_id, is_safe, latitude, longitude, reason, image_url, area, shift_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    report.user_id,
    report.is_safe,
    report.latitude,
    report.longitude,
    report.reason,
    report.image_url,
    report.area,
    report.shift_id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
