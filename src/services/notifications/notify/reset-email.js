import nodemailer from 'nodemailer';
// import { accountEmail, accountPassword } from '../../../config';
import ResetVerificationTemplate from '../templates/forgetPassword-verification';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: '587',
  secureConnection: false,
  auth: {
    user: 'dltwired@mcbitss.com', // generated ethereal user
    pass: 'Mcbitss100%' // generated ethereal password
  },
  tls: { ciphers: 'SSLv3' }
});

export const resetPasswordConfirmationEmail = ({ email, url }) => {
  return new Promise(resolve => {
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Chess App" <dltwired@mcbitss.com>', // sender address
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
