import { Router } from 'express';
import { authenticateUser } from '../shared/middleware/authMiddleware';
import {
  createPortfolio,
  listPortfolio,
  listUserPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio
} from './controller';

let router = Router();

router.post('/', authenticateUser, createPortfolio);
router.get('/', authenticateUser, listPortfolio);
router.get('/user/:userId', listUserPortfolio);
router.get('/:itemId', getPortfolio);
router.put('/:itemId', authenticateUser, updatePortfolio);
router.delete('/:itemId', authenticateUser, deletePortfolio);

export default router;