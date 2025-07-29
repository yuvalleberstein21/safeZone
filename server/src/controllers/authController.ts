import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/userModel';
import { RegisterInput } from '../types/user';

export const registerUser = async (req: Request, res: Response) => {
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
