import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
