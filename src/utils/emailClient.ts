import { createTransport } from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export const sendAccountConfirmationEmail = async (
  name: string,
  to: string,
  token: string,
) => {
  /* const verificationUrl = `${process.env.DEPLOY_URL}api/users/verify/${token}`; */
  const verificationUrl = `${process.env.FRONTEND_VERIFY_URL}/${token}`;

  const source = fs.readFileSync(
    path.join(__dirname, '../templates/validateAccountTemplate.hbs'),
    'utf8',
  );

  const template = Handlebars.compile(source);
  const replacements = {
    name: name,
    verificationUrl: verificationUrl,
  };
  const htmlToSend = template(replacements);

  const subject = 'Confirma tu cuenta';
  const html = htmlToSend;

  await sendEmail(to, subject, html);
};
