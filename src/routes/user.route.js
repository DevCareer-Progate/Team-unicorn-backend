import express from 'express';
const router = express.Router();

import userCtrl from '../controllers/user.controller';

router.post('/api/v1/auth/signup', userCtrl.signUp);
router.post('/api/v1/auth/signin', userCtrl.signIn);

export default router;

