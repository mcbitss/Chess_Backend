import { Router } from 'express';
import { create, show, getByTaskId, updateQuestion, inActiveQuestion } from './controller';

const router = new Router();

router.get('/', show);
router.get('/getByTaskId/:getByTaskId', getByTaskId);
router.put('/updateQuestion/:id', updateQuestion);
router.post('/', create);
router.put('/inActiveQuestion/:id', inActiveQuestion);

export default router;