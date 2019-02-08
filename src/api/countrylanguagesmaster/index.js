import { Router } from 'express';
import { masterUpload } from './controller';

const router = new Router();

router.get('/', masterUpload);

export default router;