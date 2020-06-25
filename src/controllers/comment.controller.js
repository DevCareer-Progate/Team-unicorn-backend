import Comment from '../models/comment.model';
import comment from '../models/comment.model';

class commentController {
    createComment(req, res) {
        const { comment } = req.body;

        if (!comment) {
            return res.json({ message: 'Please fill in the correct field' })
        }

        const newComment = new Comment({
            comment
        })

        newComment.save()
            .then(com => {
                res.json({
                    status: 'success',
                    data: {
                        message: 'comment successfully created',
                        comment: com.comment
                    }
                })
            })
            .catch(err => {
                if (err) throw err;
            })

    }
}

export default new commentController();