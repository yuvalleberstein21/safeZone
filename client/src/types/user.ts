export interface userLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  role: 'manager' | 'employee' | 'admin';
  area?: string;
  // אולי גם: email, fullName, etc
}
