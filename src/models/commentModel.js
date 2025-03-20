// models/commentModel.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        image: {
            type: String,
            required: [true, 'Image is required']
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true
        },
        commentsCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;