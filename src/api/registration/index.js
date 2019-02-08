import { Router } from 'express'
import {
  createRegistration,
  getRegisterData
} from './controller'

const router = new Router()

router.post('/', createRegistration)

router.get('/', getRegisterData)

export default router