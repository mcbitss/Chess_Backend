import { Router } from 'express';
import { loginUser } from './controller';
const router = new Router();

/**
 * @api {post} login user
 * @apiName loginuser
 * @apiGroup Login
 * @apiPermission admin
 * @apiParam {Array} args array
 * @apiSuccess {Object} token
 */
router.post('/', loginUser);

export default router;
