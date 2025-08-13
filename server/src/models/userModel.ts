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
  managerId?: number
) => {
  const result = await pool.query(
    `INSERT INTO users (username, name, role, area, created_at, updated_at, password, manager_id)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5, $6)
     RETURNING id, username, name, role, area, manager_id`,
    [username, name, role, area, password, managerId ?? null]
  );
  return result.rows[0];
};

// ONLY MANAGER
export const getManagerEmployees = async (
  managerId: number
): Promise<User[]> => {
  const result = await pool.query(
    `SELECT id, name, role, area, created_at
     FROM users
     WHERE role = 'employee' AND manager_id = $1
     ORDER BY created_at DESC`,
    [managerId]
  );
  return result.rows;
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

// Delete user
export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const deleteUserById = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
