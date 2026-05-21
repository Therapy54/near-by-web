import { Router } from 'express';
import { authenticateUser } from '../shared/middleware/authMiddleware';
import { getOwnProfile, getUserProfile, updateOwnProfile } from './controller';
import { validateUpdateProfile } from './validation';

let router = Router();

router.get('/me', authenticateUser, getOwnProfile);
router.get('/:userId', getUserProfile);
router.put('/me', authenticateUser, validateUpdateProfile, updateOwnProfile);

export default router;

