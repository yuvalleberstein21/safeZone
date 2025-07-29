export interface RegisterInput {
  username: string;
  name: string;
  password: string;
  role?: 'employee' | 'manager';
  area: string;
}
