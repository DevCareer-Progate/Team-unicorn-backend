import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gifSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const gif = mongoose.model('gif', gifSchema);
export default gif;