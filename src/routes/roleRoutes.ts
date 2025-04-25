import { Router } from 'express'
import {
  createRole,
  getAllRolesWithUsers,
  getRoleWithUsers,
  updateRole,
  deleteRole,
} from '../controllers/roleController'
import { validateBody } from '../middlewares/validateBody'
import { createRoleSchema } from '../validations/roleSchema'

const router = Router()

router.post('/', validateBody(createRoleSchema), createRole)
router.get('/', getAllRolesWithUsers)
router.get('/:roleId', getRoleWithUsers)
router.put('/:roleId', updateRole)
router.delete('/:roleId', deleteRole)

export default router
