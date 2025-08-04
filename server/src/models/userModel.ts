import pool from '../db/db';
import { User } from '../types/user';

export const findUserByUsername = async (username: string) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  return result.rows[0];
};
export const createUser = async (
  username: string,
  name: string,
  password: string,
  role: 'employee' | 'manager' | 'admin',
  area: string,
  managerId?: number // ← תמיכה אופציונלית במנהל
) => {
  const result = await pool.query(
    `INSERT INTO users (username, name, role, area, created_at, updated_at, password, manager_id)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5, $6)
     RETURNING id, username, name, role, area, manager_id`,
    [username, name, role, area, password, managerId ?? null]
  );
  return result.rows[0];
};

// ONLY ADMIN
export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(
    `SELECT id, name, role, area, created_at
     FROM users
     WHERE role != 'admin'
     ORDER BY created_at DESC`
  );
  return result.rows;
};
