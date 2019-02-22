import { Router } from 'express';
import { createTaskMapped, showTasksMapped, createTaskMappedByUser, showCompletedTasksMapped, update, showTasksMappedToUser, createTaskByUserMapping } from './controller';

const router = new Router();

router.post('/', createTaskMapped);
router.get('/', showTasksMapped);
router.get('/createTaskMappedByUser/:userId', createTaskMappedByUser);
router.get('/:userId', showCompletedTasksMapped);
router.get('/showTasksMappedToUser/:userId', showTasksMappedToUser);
router.put('/', update, createTaskMappedByUser)
router.post('/byusermapping', createTaskByUserMapping);


export default router;