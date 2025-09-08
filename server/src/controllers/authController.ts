import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/userModel';
import { RegisterInput, User } from '../types/user';
import { generateResetToken } from '../utils/token';
import nodemailer from 'nodemailer';
import pool from '../db/db';
import crypto from 'crypto';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<RegisterInput | undefined> => {
  const {
    username,
    name,
    password,
    role: requestedRole,
    area,
    managerId,
  } = req.body as RegisterInput;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(409).json({ message: 'שם משתמש קיים במערכת' });
      return;
    }

    // ברירת מחדל: כולם נרשמים כ-employee
    let role: 'employee' | 'manager' = 'employee';

    // אם המשתמש המחובר הוא admin – מותר לו לבחור תפקיד
    if (req.user?.role === 'admin') {
      if (requestedRole === 'manager' || requestedRole === 'employee') {
        role = requestedRole;

        // אם אדמין יוצר עובד, חייב לשלוח managerId
        if (role === 'employee' && !managerId) {
          res.status(400).json({
            message: 'managerId is required when admin creates an employee.',
          });
          return;
        }
      } else {
        res.status(400).json({ message: 'Invalid role provided.' });
        return;
      }
    }

    // אם המשתמש המחובר הוא manager – הוא תמיד רושם רק employees
    if (req.user?.role === 'manager') {
      role = 'employee';
    }

    // managerId:
    const finalManagerId =
      req.user?.role === 'manager' && role === 'employee'
        ? req.user.id
        : managerId ?? undefined;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(
      username,
      name,
      hashedPassword,
      role,
      area,
      finalManagerId
    );

    res.status(201).json({ message: 'משתמש נוצר בהצלחה', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'ההרשמה נכשלה' });
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
      {
        id: user.id,
        role: user.role,
        name: user.name,
        username: user.username,
      },
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE username=$1', [
    email,
  ]);

  if (!user.rows[0]) {
    return res.status(404).json({ message: 'משתמש לא נמצא' });
  }

  const { token, tokenHash } = generateResetToken();

  await pool.query(
    `UPDATE users 
     SET reset_password_token=$1, reset_password_expires=$2 
     WHERE id=$3`,
    [tokenHash, new Date(Date.now() + 3600000), user.rows[0].id] // שעה תוקף
  );

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  // שליחה במייל
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'איפוס סיסמא',
    html: `<p>לחץ על הקישור כדי לאפס סיסמא:</p>
           <a href="${resetUrl}">${resetUrl}</a>`,
  });

  res.json({ message: 'קישור לאיפוס נשלח למייל' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const result = await pool.query(
    `SELECT * FROM users 
     WHERE reset_password_token=$1 
       AND reset_password_expires > NOW()`,
    [tokenHash]
  );

  if (!result.rows[0]) {
    return res.status(400).json({ message: 'טוקן לא תקין או פג תוקף' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `UPDATE users 
     SET password=$1, reset_password_token=NULL, reset_password_expires=NULL 
     WHERE id=$2`,
    [hashedPassword, result.rows[0].id]
  );

  res.json({ message: 'סיסמא עודכנה בהצלחה' });
};
