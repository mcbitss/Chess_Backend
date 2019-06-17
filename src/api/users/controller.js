import Users from './model';
import md5 from 'md5';
import { success, notFound } from '../../services/response/';
import EmailNotify from '../../services/notifications/notify/resetpassword';

// const objId = '_id';

export const create = (req, res, next) => {
  const user = req.body;
  user.password = md5(user.password);
  Users.create(user, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp.view());
    }
  });
};

export const login = (req, res, next) => {
  Users.findOne(req.body, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      if (resp !== null) {
        res.send(resp.view());
      }
    }
  });
};

export const show = ({ params }, res, next) =>
  Users.findById(params.id)
    .then(notFound(res))
    .then(applications => (applications ? applications.view() : null))
    .then(success(res))
    .catch(next);

export const index = (req, res, next) => {
  Users.find({}, {}, { sort: { year: 1 } })
    .then(users => users.map(yearly => yearly.view()))
    .then(success(res))
    .catch(next);
};

export const applicationDashboardData = (req, res, next) => {};

export const update = (req, res, next) => {
  const { body } = req;
  Users.findByIdAndUpdate(
    body.id,
    req.body,
    { upsert: false, new: true },
    (err, result) => {
      if (err) {
        res.send({
          error: true,
          message: 'Something went wrong, please try again'
        });
      } else {
        res.send({
          error: false,
          message: 'Update success..!',
          user: result.view()
        });
      }
    }
  );
};
export const destroy = (req, res, next) => {
  if (req.params.id) {
    Users.findByIdAndRemove(req.params.id, err => {
      if (err) {
        res.send(err);
      } else {
      }
    });
  } else {
    res.send({ error: true, message: 'Object ID missing' });
  }
};
export const userslist = (req, res, next) => {
  Users.find({}, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
};

export const updatePassword = (req, res, next) => {
  Users.findById(req.params.id)
    .then(user => {
      if (!user) {
        return null;
      }
      return user;
    })
    .then(user =>
      user ? user.set({ password: req.body.password }).save() : null
    )
    .then(user => (user ? user.view(true) : null))
    .catch(next);
};

// export const forgetPassword = (req, res, next) => {
//   console.log(req.body, req.params.id, '***********');
// Users.findById(req.params.id)
//   .then(user => {
//     if (!user) {
//       return null;
//     }
//     return user;
//   })
//   .then(user =>
//     user ? user.set({ password: req.body.password }).save() : null
//   )
//   .then(user => (user ? user.view(true) : null))
//   .catch(next);
// }
export const forgetPassword = async (req, res) => {
  console.log(req.body, '***********');
  try {
    // const token = await generateUUID();
    const user = await Users.findOne({ email: req.body.email });
    const notification = await EmailNotify(req.body.email);
    console.log(notification, 'ppppppppppp');
    //   if (notification.hasError) {
    //     return res.send({
    //       error: false,
    //       message: Messages["UNABLETO_SEND_MAIL"]
    //     });
    //   }
    //   if (user.length === 0) {
    //     return res.send({
    //       error: false,
    //       message: Messages["MAIL_DOESNT_EXIST"]
    //     });
    //   } else {
    //     ForgetPassword.create({
    //       token,
    //       email: user.email,
    //       userType: user.userType,
    //       userId: user._id
    //     });
    //     return res.send({
    //       error: false,
    //       message: Messages["MAIL_RESET_PASSWORD"]
    //     });
    //   }
  } catch (error) {
    return res.send({
      error: true,
      message: 'INTERNAL_SERVER_ERROR'
    });
  }
};
