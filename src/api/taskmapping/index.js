import { Router } from 'express';
import { createTaskMapped, showTasksMapped,
    updateTaskMapping, bulkAssignment, createTaskMappedByUser, fetchUsersAssignment,
    showCompletedTasksMapped, update, showTasksMappedToUser, createTaskByUserMapping 
} from './controller';

const router = new Router();

router.post('/', createTaskMapped);
router.post('/bulkAssignment', bulkAssignment);
router.post('/fetchUsersAssignment', fetchUsersAssignment);
router.get('/', showTasksMapped);
router.get('/createTaskMappedByUser/:userId', createTaskMappedByUser);
router.post('/updateTaskMapping/:id', updateTaskMapping);
router.get('/:userId', showCompletedTasksMapped);
router.get('/showTasksMappedToUser/:userId', showTasksMappedToUser);
router.put('/', update, createTaskMappedByUser)
router.post('/byusermapping', createTaskByUserMapping);


export default router;