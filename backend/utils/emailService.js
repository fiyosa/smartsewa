const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Kirim email
 * @param {string} to - email tujuan
 * @param {string} subject - subjek email
 * @param {string} html - konten HTML
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"SmartSewa System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
