import express from 'express';
const router = express.Router();

import gifCtrl from '../controllers/git.controller';

router.post('/gif', gifCtrl.createGif);
router.delete('/:id', gifCtrl.deleteGif);

export default router;