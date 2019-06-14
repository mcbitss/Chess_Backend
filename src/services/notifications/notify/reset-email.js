import nodemailer from 'nodemailer';
// import { accountEmail, accountPassword } from '../../../config';
import ResetVerificationTemplate from '../templates/forgetPassword-verification';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'dltwired@mcbitss.com', // generated ethereal user
    pass: 'Mcbitss100%' // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const resetPasswordConfirmationEmail = ({ email, url }) => {
  console.log(url, '0000000');

  return new Promise(resolve => {
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Bytrol" <info@mcbitsstech.in>', // sender address
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
