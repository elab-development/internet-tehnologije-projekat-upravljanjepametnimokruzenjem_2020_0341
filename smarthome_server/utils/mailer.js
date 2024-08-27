import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const gmailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
};

export const transporter = nodemailer.createTransport(gmailConfig);

export const MailGenerator = new Mailgen({
  theme: 'cerberus',
  product: {
    name: 'SmartHome Assistant',
    link: 'https://smart-homes.rs/',
  },
});