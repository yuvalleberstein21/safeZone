export interface RegisterInput {
  username: string;
  name: string;
  password: string;
  role?: 'employee' | 'manager' | 'admin';
  area: string;
  managerId?: number | undefined;
}

export interface User {
  id: number;
  username: string;
  name: string;
  password: string;
  role: 'employee' | 'manager' | 'admin';
  area: string;
  created_at: string;
  updated_at: string;
}
