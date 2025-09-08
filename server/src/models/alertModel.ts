import pool from '../db/db';
import { Alert } from '../types/alert';

export const getReportsWithUserInfoForAdmin = async () => {
  const query = `
    SELECT 
      reports.*, 
      users.username, 
      users.name AS user_name, 
      users.role, 
      users.area AS user_area
    FROM reports
    JOIN users ON reports.user_id = users.id
    ORDER BY reports.timestamp DESC;
  `;
  const result = await pool.query(query);
  return result.rows;
};
