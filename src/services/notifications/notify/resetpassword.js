import { resetPasswordConfirmationEmail } from './reset-email';
import { resetPassword } from '../../../config';

const EmailNotify = (email, token) => {
  console.log(resetPassword, '7777777777777');
  const resetPassword = 'http://localhost:8081/#/';
  new Promise(async resolve => {
    const notification = await resetPasswordConfirmationEmail({
      email,
      url: `${resetPassword}forgetpassword`
    });
    resolve(notification);
  });
};

export default EmailNotify;
