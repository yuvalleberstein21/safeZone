import express from 'express';
import { registerUser } from '../controllers/authController';
import { validateRegister } from '../middlewares/validateRegister';

const router = express.Router();

router.post('/register', validateRegister, registerUser);

export default router;
