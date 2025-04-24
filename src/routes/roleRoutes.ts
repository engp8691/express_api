import { Router } from 'express'
import { createRole, deleteRole } from '../controllers/roleController'
import { validateBody } from '../middlewares/validateBody'
import { createRoleSchema } from '../validations/roleSchema'

const router = Router()

router.post('/', validateBody(createRoleSchema), createRole)
router.delete('/:roleId', deleteRole)

export default router
