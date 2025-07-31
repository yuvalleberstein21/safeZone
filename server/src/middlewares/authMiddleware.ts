import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  role: 'employee' | 'manager';
  username: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      role: 'employee' | 'manager';
      username: string;
    };
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'לא מורשה' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export const isManager = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'manager') {
    res.status(403).json({ message: 'Access denied: Manager only' });
    return;
  }
  next();
};

export const isEmployee = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'employee') {
    res.status(403).json({ message: 'Access denied: Employee only' });
    return;
  }
  next();
};
