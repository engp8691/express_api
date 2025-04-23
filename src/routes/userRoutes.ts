import { Router } from 'express';
import { loginUser } from '../controllers/loginController';
import { loginSchema } from '../schemas/loginSchema';
import { validateBody } from '../middlewares/validateBody';

const router = Router();

router.post('/login', validateBody(loginSchema), loginUser);

export default router;
