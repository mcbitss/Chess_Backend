import { Router } from 'express';
import { createTaskMapped, showTasksMapped, createTaskMappedByUser } from './controller';

const router = new Router();

router.post('/', createTaskMapped);
router.get('/', showTasksMapped);
router.get('/createTaskMappedByUser/:userId', createTaskMappedByUser);

export default router;