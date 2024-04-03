import nodemailer from "nodemailer";
import 'dotenv/config'


type Payload = {
  to: string;
  subject: string;
  html: string;
};

const smtpSettings = {
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data,
  });
};
