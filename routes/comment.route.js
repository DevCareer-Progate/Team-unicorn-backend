import express from 'express';
const router = express.Router();

import articleCtrl from '../controllers/comment.controller';


router.post('/articles/:id/comment', articleCtrl.createComment);

export default router;