import { Router } from 'express';
import { create, show, getByTaskId } from './controller';

const router = new Router();

router.get('/', show);
router.get('/getByTaskId/:getByTaskId', getByTaskId);
router.post('/', create);

export default router;