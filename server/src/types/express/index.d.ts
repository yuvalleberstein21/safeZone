import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: 'employee' | 'manager' | 'admin';
        username: string;
      };
    }
  }
}

export {};
