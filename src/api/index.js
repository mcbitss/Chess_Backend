import { Router } from 'express';
import users from './users';
import auth from './auth';
import questions from './questions';
import registration from './registration';
import task from './task';
import taskmapping from './taskmapping';
import login from './login';

const router = new Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/registration', registration);
router.use('/questions', questions);
router.use('/task', task);
router.use('/taskmapping', taskmapping);
router.use('/questions', questions);
router.use('/login', login);

export default router;
