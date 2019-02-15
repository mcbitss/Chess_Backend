import { Router } from 'express';
import { createTask, showTasks, updateTask, checkAndInsertBulk } from './controller';

const router = new Router();

router.post('/', createTask);
router.get('/', showTasks);
router.put('/updateTask/:id', updateTask);
router.post('/checkAndInsertBulk', checkAndInsertBulk);

export default router;