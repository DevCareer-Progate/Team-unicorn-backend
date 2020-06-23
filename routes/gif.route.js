import express from 'express';
const router = express.Router();

import gifCtrl from '../controllers/git.controller';

router.post('/gif', gifCtrl.createGif);

export default router;