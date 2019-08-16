import { resetPasswordConfirmationEmail } from './reset-email';
// import { config } from '../../../config';

const EmailNotify = async (email, user) => {
  try {
    console.log(user, 'user');
    const resetPassword = 'http://localhost:8080/#/';
    // new Promise(async resolve => {
    const notification = await resetPasswordConfirmationEmail({
      email,
      url: `${resetPassword}forgetpassword/?token=${user.token}`
    });
    return notification;
  } catch (error) {
    console.log(error, 'in notification');
  }
  // resolve(notification);
  // });
};

export default EmailNotify;
