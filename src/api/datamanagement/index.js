import { Router } from 'express'
import {
    createDataManagement,
    getQuizData
} from './controller'
// import { token } from '../../services/passport'

const router = new Router()

router.post('/', createDataManagement)

router.get('/', getQuizData)

export default router