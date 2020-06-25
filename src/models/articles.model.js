import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    articleId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

const article = mongoose.model('article', articleSchema);
export default article;