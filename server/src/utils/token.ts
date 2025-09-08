import crypto from 'crypto';

export function generateResetToken() {
  const token = crypto.randomBytes(32).toString('hex'); // זה נשלח למייל
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex'); // זה נשמר ב־DB
  return { token, tokenHash };
}
