import { Router } from 'express';
import { createRole } from '../controllers/roleController';

const router = Router();

router.post('/', createRole);

export default router;
