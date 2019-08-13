import nodemailer from 'nodemailer';
import { SMTP_USER, SMTP_PW } from '../../../config';
import ResetVerificationTemplate from '../templates/forgetPassword-verification';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secureConnection: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PW
  },
  tls: { rejectUnauthorized: false }
});

export const resetPasswordConfirmationEmail = ({ email, url }) => {
  return new Promise(resolve => {
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Chess App" <chessapp@mcbitss.com>', // sender address
      to: email, // list of receivers
      subject: 'Welcome to Chess App Portal: Reset Your Password', // Subject line
      html: ResetVerificationTemplate(url)
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return resolve({ hasError: true, error });
      }
      resolve({ hasError: false });
    });
  });
};
