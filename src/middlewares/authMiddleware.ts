import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (!token) {
    res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;

    next();
  } catch (err) {
    console.log('ERROR CON EL TOKEN');
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
