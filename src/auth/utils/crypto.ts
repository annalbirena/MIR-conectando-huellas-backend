import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

/**
 * Hash password
 * @param password password to hash
 * @param factor Number of rounds to hasg the password, default is 10
 * @returns Promise<string> hashed password
 */
export async function hashPassword(
  password: string,
  factor?: number,
): Promise<string> {
  // 1. salt
  const salt = await bcrypt.genSalt(factor);

  // 2. hash
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
}

/**
 * Compare password
 * @param password Original password
 * @param hashedPassword Password from database
 * @returns Promise<boolean> true if password is correct, false otherwise
 */
export function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function createHashToken(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex');
}
