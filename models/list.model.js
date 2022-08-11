import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        required: true,
        type: String
    },
    userId: {
        type: String
    }
}, { timestamps: true});

const listModel = mongoose.model('List', listSchema);

export default listModel;