import { Router } from 'express';
import {
  createTask,
  showTasks,
  updateTask,
  checkAndInsertBulk,
  inActiveTask,
  getFile
} from './controller';

const router = new Router();

router.post('/', createTask);
router.get('/', showTasks);
router.put('/updateTask/:id', updateTask);
router.post('/checkAndInsertBulk', checkAndInsertBulk);
router.put('/inActiveTask/:id', inActiveTask);
router.get('/getFile/:id/:fileType/:taskType', getFile);

export default router;
