import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  create,
  index,
  show,
  update,
  destroy,
  byCountry
} from './controller'
import { schema } from './model'
export { schema } from './model'

const router = new Router()
const {
  language,
  country
} = schema.tree

router.post(
  '/',
  body({
    language,
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
  '/:country',
  byCountry
)

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
