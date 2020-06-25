import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import Gif from '../models/gif.model';

class gifController {
    createGif(req, res) {
        const { userId, title, image } = req.body;

        if (!userId || !title || !image) {
            return res.status(400).json({ message: 'Please fill the required field' });
        }

        const newGif = new Gif({
            title,
            image
        });

        newGif.save()
            .then(gif => {
                res.json({
                    status: 'success',
                    data: {
                        gifId: gif.userId,
                        message: 'GIF image successfully posted',
                        createdOn: Date.now,
                        title: gif.title,
                        image: gif.image,
                    }
                })
            })
    }

    deleteGif(req, res) {
        const _id = req.params.id;
        Gif.findOneAndRemove(_id)
            .then(gif => {
                if (!gif) {
                    return res.json({ message: 'There is no gif with the Id' });
                }

                res.json({
                    status: 'success',
                    data: {
                        message: 'gif post successfully deleted'
                    }
                })
            })
            .catch(err => {
                res.json({
                    status: 'Failed',
                    data: {
                        message: 'gif can not be deleted',
                        err
                    }
                })
            })
    }

}

export default new gifController();
