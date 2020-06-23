import Article from '../models/articles.model';

class articleController {

    createArticle(req, res) {
        const { articleId, title, article } = req.body;

        if (!articleId || !title || !article) {
            res.json({ message: 'Please fill the required field appropriately' }).status(400);
        }

        const newArticle = new Article({
            articleId,
            title,
            article
        })

        newArticle.save(art => {
            res.json({
                status: 'success',
                data: {
                    message: 'Article successfully posted',
                    articleId: art.articleId,
                    createdOn: Date.now,
                    title: art.title
                }
            })
        })
            .catch(err => {
                res.json({
                    status: 'unsuccessful',
                    message: 'The article can not be posted',
                    err
                })
            })
    }

    updateArticle(req, res) {
        Article.findOneAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(art => {
                if (!art) {
                    return res.json({ message: 'There is no Id with specific user' }).status(400);
                }

                res.json({
                    status: 'success',
                    data: {
                        message: 'Article successfully updated',
                        title: art.title,
                        article: art.article
                    }
                })
                    .catch(err => {
                        res.json({
                            status: 'Failed',
                            data: {
                                message: 'Article can not be updated',
                                err
                            }
                        })
                    })
            })
    }

    deleteArticle(req, res) {
        const _id = req.params.id;
        Article.findByIdAndRemove(_id)
            .then(article => {
                if (!article) {
                    return res.json({ message: 'There is no user with the Id' });
                }
                res.json({
                    status: 'success',
                    data: {
                        messgae: 'Article successfully deleted'
                    }
                })
            })
    }
}

export default new articleController;