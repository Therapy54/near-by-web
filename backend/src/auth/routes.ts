import { Router } from 'express';
import { register, login, logout, verifyToken } from './controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verifyToken);

export default router;
