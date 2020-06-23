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
}

export default new articleController;