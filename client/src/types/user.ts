export interface userLogin {
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  role: 'manager' | 'user' | 'admin';
  // אולי גם: email, fullName, etc
}
