import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  create,
  index,
  show,
  update,
  destroy,
  login
} from './controller'
import { schema } from './model'
export { schema } from './model'

const router = new Router()
const {
  username,
  email,
  password,
  phone,
  country,
  language
} = schema.tree

router.post(
  '/',
  body({
    username,
    email,
    password,
    phone,
    country,
    language
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

router.post(
  '/login',
  login
)

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
