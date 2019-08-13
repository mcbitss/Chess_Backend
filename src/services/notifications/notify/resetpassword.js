import { resetPasswordConfirmationEmail } from './reset-email';
// import { config } from '../../../config';

const EmailNotify = async (email, token) => {
  try {
    const resetPassword = 'http://localhost:8080/#/';
    // new Promise(async resolve => {
    const notification = await resetPasswordConfirmationEmail({
      email,
      url: `${resetPassword}forgetpassword`
    });
    return notification;
  } catch (error) {
    console.log(error, 'in notification');
  }
  // resolve(notification);
  // });
};

export default EmailNotify;
