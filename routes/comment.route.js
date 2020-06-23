import express from 'express';
const router = express.Router();

import commentCtrl from '../controllers/comment.controller';


router.post('/articles/:id/comment', commentCtrl.createComment);
router.post('/gifs/:id/comment', commentCtrl.createComment);

export default router;