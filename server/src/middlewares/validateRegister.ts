import { Request, Response, NextFunction } from 'express';

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, name, password, area } = req.body;

  if (!username || !name || !password || !area) {
    return res.status(400).json({ message: 'יש למלא את כל השדות' });
  }

  const nameRegex = /^[\u0590-\u05FFa-zA-Z\s]{2,}$/;
  if (!nameRegex.test(name)) {
    return res
      .status(400)
      .json({ message: 'השם חייב להכיל לפחות 2 אותיות בלבד' });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'הסיסמה חייבת להכיל לפחות 6 תווים, כולל אות ומספר',
    });
  }

  if (area.trim().length < 2) {
    return res
      .status(400)
      .json({ message: 'יש להזין אזור באורך של לפחות 2 תווים' });
  }

  next();
};
