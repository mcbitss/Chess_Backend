import { Router } from 'express';
import {
  createTask,
  showTasks,
  updateTask,
  checkAndInsertBulk,
  inActiveTask
} from './controller';

const router = new Router();

router.post('/', createTask);
router.get('/', showTasks);
router.post('/updateTask/:id', updateTask);
router.post('/checkAndInsertBulk', checkAndInsertBulk);
router.post('/inActiveTask/:id', inActiveTask);

export default router;
