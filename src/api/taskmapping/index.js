import { Router } from 'express';
import { showTasks } from './controller';

const router = new Router();

router.get('/', showTasks);

export default router;