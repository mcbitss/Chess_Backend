import { Router } from 'express';
import { createTaskMapped, showTasksMapped, createTaskMappedByUser,update } from './controller';

const router = new Router();

router.post('/', createTaskMapped);
router.get('/', showTasksMapped);
router.get('/createTaskMappedByUser/:userId', createTaskMappedByUser);
router.put('/', update)

export default router;