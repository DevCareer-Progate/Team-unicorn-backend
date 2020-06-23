import express from 'express';
const router = express.Router();

import articleCtrl from '../controllers/articles.controller';

router.post('/artilces', articleCtrl.createArticle);

export default router;