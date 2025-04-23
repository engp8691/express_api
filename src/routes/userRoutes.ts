import { Router } from 'express';
import { loginUser } from '../controllers/loginController';
import { createUser, assignRoleToUser, getUserWithRoles } from '../controllers/userController';
import { loginSchema } from '../schemas/loginSchema';
import { validateBody } from '../middlewares/validateBody';

const router = Router();

router.post('/', createUser);
router.post('/:userId/roles/:roleId', assignRoleToUser);
router.get('/:userId', getUserWithRoles);
router.post('/login', validateBody(loginSchema), loginUser);

export default router;
