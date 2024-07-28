import { Router } from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getUser);

export default router;