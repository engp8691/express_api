import { Router } from 'express';
import { loginUser } from '../controllers/loginController';
import { createUser, assignRoleToUser, getUserWithRoles, getAllUsersWithRoles } from '../controllers/userController';
import { validateBody } from '../middlewares/validateBody';
import { createUserSchema, loginSchema } from '../validations/userSchema';

const router = Router();

router.post('/', validateBody(createUserSchema), createUser);
router.post('/:userId/roles/:roleId', assignRoleToUser);
router.get('/', getAllUsersWithRoles);
router.get('/:userId', getUserWithRoles);
router.post('/login', validateBody(loginSchema), loginUser);

export default router;
