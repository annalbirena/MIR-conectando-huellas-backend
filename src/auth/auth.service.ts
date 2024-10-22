import jwt from 'jsonwebtoken';

import type { PayloadType } from './auth.types';

const SECRET = 'mysecretkey';

/**
 * Generates a signed token
 * @param payload Payload to be signed
 * @returns signed token
 */
export function signToken(payload: PayloadType) {
  const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });
  return token;
}

/**
 * Verifies a token
 * @param token Token to be verified
 * @returns decoded token
 */
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET);

    return decoded;
  } catch (error) {
    return null;
  }
}
