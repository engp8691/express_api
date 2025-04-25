import { Router } from 'express'
import {
  createUser,
  assignRoleToUser,
  getUserWithRoles,
  getAllUsersWithRoles,
  loginUser,
  deleteUser,
  updateUser,
} from '../controllers/userController'
import { validateBody } from '../middlewares/validateBody'
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from '../validations/userSchema'
import { authorize } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', validateBody(createUserSchema), createUser)
router.post('/:userId/roles/:roleId', assignRoleToUser)
router.get('/', authorize, getAllUsersWithRoles)
router.get('/:userId', getUserWithRoles)
router.put('/:userId', validateBody(updateUserSchema), updateUser)
router.delete('/:userId', deleteUser)
router.post('/login', validateBody(loginSchema), loginUser)

export default router
