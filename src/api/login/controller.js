import Users from '../users/model';
import { sign } from '../../services/jwt';

export const loginUser = (req, res, next) => {
  const user = req.body.username;
  let password = req.body.password;
  Users.findOne({ username: user }).exec((err, user) => {
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
      user.authenticate(password).then(async bool => {
        if (bool) {
          const token = await sign({ id: user._id, token: null });
          res.send({
            _id: user._id,
            User: user.username,
            userType: user.userType,
            email: user.email,
            message: 'Login successful',
            // message: '',
            success: true,
            token
          });
        } else {
          res.send({
            user,
            success: false,
            category: null,
            message: 'Incorrect Password',
            token: null
          });
        }
      });
    }
  });
};
