import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  createTranslations,
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
  ref,
  languages,
  country
} = schema.tree

router.post(
  '/',
  body({
    ref,
    languages,
    country
  }),
  createTranslations
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
  '/:category/:country/:language',
  byCategory
)

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
