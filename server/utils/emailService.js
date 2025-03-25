const transporter = require('../config/email');

const sendVerificationEmail = async (email, token) => {
  if (!token) {
    throw new Error('Verification token is required');
  }

  const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  const apiLink = `http://localhost:5000/api/auth/verify/${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Email Verification',
    html: `
      <h2>Email Verification</h2>
      <p>Please click the button below to verify your email:</p>
      <a href="${apiLink}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #1976d2;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin: 20px 0;
      ">Verify Email</a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${apiLink}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail }; 