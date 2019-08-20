import Users from '../users/model';
import { sign } from '../../services/jwt';

export const loginUser = (req, res, next) => {
  const email = req.body.email;
  let password = req.body.password;
  Users.findOne({ email, password }).exec((err, user) => {
    if (err) {
      res.send({
        user,
        success: false,
        category: null,
        message: 'Invalid User',
        token: null,
        err
      });
    } else {
      if (user) {
        res.send({
          id: user._id,
          username: user.username,
          userType: user.userType,
          email: user.email,
          message: 'Login successful',
          success: true,
          token: ''
        });
      } else {
        res.send({
          user,
          success: false,
          category: null,
          message: 'Invalid User',
          token: null,
          err
        });
      }
      // user.authenticate(password).then(async bool => {
      //   if (bool) {
      //     const token = await sign({ id: user._id, token: null });
      //     res.send({
      //       id: user._id,
      //       username: user.username,
      //       userType: user.userType,
      //       email: user.email,
      //       message: 'Login successful',
      //       success: true,
      //       token
      //     });
      //     // res.send(user.view());
      //   } else {
      //     res.send({
      //       // user,
      //       success: false,
      //       category: null,
      //       message: 'Incorrect Password',
      //       token: null
      //     });
      //   }
      // });
    }
  });
};
