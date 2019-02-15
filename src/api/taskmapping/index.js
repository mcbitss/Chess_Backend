import { Router } from 'express';
import { createTaskMapped, showTasksMapped, createTaskMappedByUser, showCompletedTasksMapped, update } from './controller';

const router = new Router();

router.post('/', createTaskMapped);
router.get('/', showTasksMapped);
router.get('/createTaskMappedByUser/:userId', createTaskMappedByUser);
router.get('/:userId', showCompletedTasksMapped);
router.put('/', update, createTaskMappedByUser)

export default router;