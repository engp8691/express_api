import { Router } from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController';
import { authorize } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authorize, createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
