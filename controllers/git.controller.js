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


}

export default new gifController();
