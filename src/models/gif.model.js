import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gifSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const gif = mongoose.model('gif', gifSchema);
export default gif;