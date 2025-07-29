import pool from '../db/db';

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
  role: 'employee' | 'manager',
  area: string
) => {
  const result = await pool.query(
    `INSERT INTO users (username, name, role, area, created_at, updated_at, password)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5)
     RETURNING id, username, name, role, area`,
    [username, name, role, area, password]
  );
  return result.rows[0];
};
