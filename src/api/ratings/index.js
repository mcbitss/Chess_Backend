import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  create,
  index,
  show,
  update,
  destroy,
  byUser
} from './controller'
import { schema } from './model'
export { schema } from './model'

const router = new Router()
const {
  user,
  rating
} = schema.tree

router.post(
  '/',
  body({
    user,
    rating
  }),
  create
)

router.put(
  '/',
  update
)

router.get(
  '/',
  index
)

router.get(
  '/user/:user',
  byUser
)

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
