import { Router } from 'express';
import AuthRouter from './modules/autentication/interfaces/auth-route.js';

const router = Router();
router.use('/login', AuthRouter);

export default router;