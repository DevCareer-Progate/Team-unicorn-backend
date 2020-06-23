import express from 'express';
const router = express.Router();

import articleCtrl from '../controllers/articles.controller';


router.post('/artilces', articleCtrl.createArticle);
router.patch('/:id', articleCtrl.updateArticle);
router.delete('/:id', articleCtrl.deleteArticle);

export default router;