import { Router } from 'express'
import users from './users'
import auth from './auth'
import questions from './Questions';
import testDetails from './testDetails';
import registration from './registration'
import datamanagement from './datamanagement'
import reports from './reports';
import countries from './countries';
import languages from './languages';
import countrylanguagesmaster from './countrylanguagesmaster';
import questionTranslations from './questionTranslations';
import translations from './translations';
import frequentlyAskedQuestion from './frequentlyAskedQuestions';
import drivingSchools from './drivingSchools';
import ratings from './ratings';
import task from './task';

const router = new Router()

router.use('/users', users);
router.use('/auth', auth)
router.use('/registration', registration)
router.use('/datamanagement', datamanagement)
router.use('/questions', questions);
router.use('/testDetails', testDetails);
router.use('/reports', reports);
router.use('/countries', countries);
router.use('/languages', languages);
router.use('/countrylanguagesmaster', countrylanguagesmaster);
router.use('/questionTranslations', questionTranslations);
router.use('/translations', translations);
router.use('/frequentlyaskedquestions', frequentlyAskedQuestion);
router.use('/drivingSchools', drivingSchools);
router.use('/ratings', ratings);
router.use('/task', task);

export default router
