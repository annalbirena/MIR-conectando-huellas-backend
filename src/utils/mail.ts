import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

async function fakeTransporter() {
  // Fake service for testing
  const testAccount = await nodemailer.createTestAccount();

  // 1. crear el transport -> requiere de un servicio de correo
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  return transporter;
}

function gmailTransporter() {
  const hostname = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;

  // Send Email
  const transporter = nodemailer.createTransport({
    host: hostname,
    port,
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  });

  return transporter;
}

export async function sendEmail(message: Mail.Options) {
  const transporter = gmailTransporter();
  const info = await transporter.sendMail(message);

  return info;
}

export async function sendMailSendgrid(data: sgMail.MailDataRequired) {
  const apiKey = process.env.SENDGRID_API_KEY as string;
  sgMail.setApiKey(apiKey);

  const result = await sgMail.send(data);
}
