import { Router } from 'express';
import { createTask, showTasks } from './controller';

const router = new Router();

router.post('/', createTask);
router.get('/', showTasks);

export default router;