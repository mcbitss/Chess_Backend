import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  create,
  index,
  show,
  update,
  destroy
} from './controller'
import { schema } from './model'
export { schema } from './model'

const router = new Router()
const {
  user,
  date,
  results
} = schema.tree

router.post(
  '/',
  body({
    user,
    date,
    results
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

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
