import { Router } from 'express'
import {
  createUser,
  assignRoleToUser,
  getUserWithRoles,
  getAllUsersWithRoles,
  loginUser,
  deleteUser,
} from '../controllers/userController'
import { validateBody } from '../middlewares/validateBody'
import { createUserSchema, loginSchema } from '../validations/userSchema'

const router = Router()

router.post('/', validateBody(createUserSchema), createUser)
router.post('/:userId/roles/:roleId', assignRoleToUser)
router.get('/', getAllUsersWithRoles)
router.get('/:userId', getUserWithRoles)
router.delete('/:userId', deleteUser)
router.post('/login', validateBody(loginSchema), loginUser)

export default router
