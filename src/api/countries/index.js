import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  create,
  index,
  show,
  update,
  destroy,
  byCategory
} from './controller'
import { schema } from './model'
export { schema } from './model'

const router = new Router()
const {
 country
} = schema.tree

router.post(
  '/',
  body({
   country
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
  '/:category',
  byCategory
)

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
