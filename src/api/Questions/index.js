import { Router } from 'express'
import { middleware as body } from 'bodymen'

import {
  create,
  index,
  show,
  update,
  destroy,
  byCategory,
  byCountryAndLanguage
} from './controller'
import { createTranslations, updateCreateTranslations } from '../questionTranslations/controller'
import { schema } from './model'
export { schema } from './model'

const router = new Router()
const {
  question,
  options,
  image,
  correctAnswer,
  category,
  country,
  language
} = schema.tree

router.post(
  '/',
  body({
    question,
    options,
    image,
    correctAnswer,
    category,
    country,
    language
  }),
  create, createTranslations
)

router.put(
  '/',
  update
)

router.post('/questionTranslate', create, updateCreateTranslations)

router.get(
  '/',
  index
)

router.get(
  '/:category/:country/:language',
  byCategory
)

router.get(
  '/:country/:language',
  byCountryAndLanguage
)

router.get('/:id',
 show)

router.delete('/:id',
 destroy)

export default router
