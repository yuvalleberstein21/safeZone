import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/userModel';
import { RegisterInput, User } from '../types/user';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<RegisterInput | undefined> => {
  const {
    username,
    name,
    password,
    role = 'employee',
    area,
  } = req.body as RegisterInput;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(409).json({ message: 'Username already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, name, hashedPassword, role, area);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed.' });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const { username, password } = req.body as User;

  if (!username || !password) {
    res.status(400).json({ message: 'אנא מלא/י את כל השדות' });
    return;
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(401).json({ message: 'שם משתמש או סיסמא שגויים' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'שם משתמש או סיסמא שגויים' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        area: user.area,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
