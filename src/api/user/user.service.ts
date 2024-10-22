import { PrismaClient } from '@prisma/client';
import { add } from 'date-fns';

import { createHashToken, hashPassword } from '@auth/utils/crypto';
import type { User } from './user.type';

const prisma = new PrismaClient();

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(input: User) {
  if (!input.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await hashPassword(input.password);
  const currentDate = new Date();
  const expiresIn = add(currentDate, { days: 1 });

  const data: User = {
    ...input,
    password: hashedPassword,
    passwordResetToken: createHashToken(input.email),
    passwordResetTokenExpiry: expiresIn
  };

  const newUser = await prisma.user.create({
    data,
  });

  return newUser;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function getUserByToken(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
    },
  });

  return user;
}

export async function updateUser(data: User) {
  const user = await prisma.user.update({
    where: {
      id: data.id,
    },
    data,
  });

  return user;
}
