export interface RegisterInput {
  username: string;
  name: string;
  password: string;
  role?: 'employee' | 'manager';
  area: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  password: string;
  role: 'employee' | 'manager';
  area: string;
  created_at: string;
  updated_at: string;
}
