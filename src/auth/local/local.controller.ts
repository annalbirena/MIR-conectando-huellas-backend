import type { Request, Response } from 'express';
import { isAfter } from 'date-fns';

import { getUserByEmail, getUserByToken, updateUser } from '@api/user/user.service';
import { comparePassword } from '@auth/utils/crypto';
import { createAuthResponse } from './local.service';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(400).json({
        message: 'User not found',
      });
    } else {
      // Compare password
      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        res.status(400).json({
          message: 'Email or password is incorrect',
        });
      } else {
        const response = createAuthResponse(user);

        res.json(response);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function activateAccountHandler(req: Request, res: Response) {
  const { token } = req.params;

  const user = await getUserByToken(token);

  if (!user) {
    res.status(400).json({ message: 'Invalid token' });
  } else {
    const currentDate = new Date();
    const tokenExpired = user.passwordResetTokenExpiry as Date;

    if (isAfter(currentDate, tokenExpired)) {
      res.status(400).json({ message: 'Token has expired' });
    } else {
      const data = {
        ...user,
        passwordResetToken: null,
        passwordResetTokenExpiry: null,
        isActive: true,
      }

      await updateUser(data);

      const response = createAuthResponse(user);

      res.json(response);
    }
  }
}
