import { Router } from 'express'
import { createRole } from '../controllers/roleController'
import { validateBody } from '../middlewares/validateBody'
import { createRoleSchema } from '../validations/roleSchema'

const router = Router()

router.post('/', validateBody(createRoleSchema), createRole)

export default router
