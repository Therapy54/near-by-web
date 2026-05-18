import { Router, Request, Response } from 'express';
import { register, login, logout, verifyToken, createSession, clearSession } from './controller';
import { validateRegister, validateLogin } from './validation';

let router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.post('/session', createSession);
router.delete('/session', clearSession);

export default router;
