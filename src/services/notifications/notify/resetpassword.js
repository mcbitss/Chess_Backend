import { resetPasswordConfirmationEmail } from './reset-email';
// import { config } from '../../../config';

const EmailNotify = async (email, token) => {
  const resetPassword = 'http://localhost:8081/#/';
  // new Promise(async resolve => {
  const notification = await resetPasswordConfirmationEmail({
    email,
    url: `${resetPassword}forgetpassword`
  });
  return notification;
  // resolve(notification);
  // });
};

export default EmailNotify;
