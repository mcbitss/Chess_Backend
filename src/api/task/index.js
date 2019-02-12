import { Router } from 'express';
import { createTask } from './controller';

const router = new Router();

router.post('/', createTask);

export default router;