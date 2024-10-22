import type { Request, Response } from 'express';

import { createUser, getAllUsers } from './user.service';
import { sendEmail, sendMailSendgrid } from '../../utils/mail';

export async function getAllUserHandler(req: Request, res: Response) {
  const users = await getAllUsers();

  res.json(users);
}

export async function createUserHandler(req: Request, res: Response) {
  const data = req.body;

  try {
    const newUser = await createUser(data);

    // Send email
    const emailData = {
      from: 'No reply <cristian.moreno@makeitreal.camp>',
      to: newUser.email,
      subject: 'Welcome to the app',
      html: `<h1>Welcome to the app</h1><p>Click <a href="${process.env.FRONTEND_URL}/verify-account/${newUser.passwordResetToken}">here</a> to verify your account</p>`,
    };

    await sendEmail(emailData);
    // const emailData = {
    //   from: 'No reply <cristian.moreno@makeitreal.camp>',
    //   to: newUser.email,
    //   subject: 'Welcome to the app',
    //   templateId: 'd-9d8a8ee889334d0b85d97324df6c0737',
    //   dynamicTemplateData: {
    //     firstName: newUser.name,
    //     lastName: newUser.lastName,
    //     url: `${process.env.FRONTEND_URL}/verify-account/${newUser.passwordResetToken}`,
    //   }
    // };
    // await sendMailSendgrid(emailData);

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
}
