import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const comment = mongoose.model('comment', commentSchema);

export default comment;