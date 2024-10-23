import { createTransport } from 'nodemailer';

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
  to: string,
  token: string,
) => {
  // Cambiar la URL de producción
  const verificationUrl = `${process.env.DEPLOY_URL}api/users/verify/${token}`;

  const subject = 'Confirma tu cuenta';
  const html = `
    <h2>Conectando Huellas</h2>
    <h3>¡Bienvenido a nuestra comunidad!</h3>
    <p>Confirma tu cuenta haciendo click <a target="_blank" href="${verificationUrl}">aquí</a></p>
  `;

  await sendEmail(to, subject, html);
};
