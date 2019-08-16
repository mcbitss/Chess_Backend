import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { password as passwordAuth } from '../../services/passport';

import {
  create,
  index,
  show,
  update,
  destroy,
  login,
  userslist,
  updatePassword,
  forgetPassword,
  resetpassword
} from './controller';
import { schema } from './model';
export { schema } from './model';

const router = new Router();
const { username, email, password, phone, country, language } = schema.tree;

router.post(
  '/',
  // body({
  //   username,
  //   email,
  //   password,
  //   phone,
  //   country,
  //   language
  // }),
  create
);

router.put('/', update);

router.get('/', index);

router.get('/user/:id', show);

router.post('/login', login);

router.delete('/user/:id', destroy);

router.get('/usersList', userslist);

router.put('/changepassword/:id', updatePassword);

router.put('/forgetpassword', forgetPassword);

router.post('/resetpassword', resetpassword);
export default router;
