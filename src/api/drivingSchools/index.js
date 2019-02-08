import { Router } from 'express';
import { middleware as body } from 'bodymen';

import {
  create,
  index,
  show,
  update,
  destroy,
  updateDrivingSchool
} from './controller';
import { schema } from './model';
export { schema } from './model';

const router = new Router();
const {
  name,
  description,
  email,
  phone,
  address,
  distance,
  latitude,
  longitude
} = schema.tree;

router.post(
  '/',
  body({
    name,
    description,
    email,
    phone,
    address,
    distance,
    latitude,
    longitude
  }),
  create
);

router.put('/', update);

router.get('/', index);

router.get('/:id', show);

router.delete('/:id', destroy);

router.post('/updateDrivingSchool/:id', updateDrivingSchool);
export default router;
