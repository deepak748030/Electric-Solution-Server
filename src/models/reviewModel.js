// models/reviewModel.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Review content is required'],
            trim: true,
            maxlength: [500, 'Review cannot exceed 500 characters']
        },
        authorName: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true
        },
        authorImage: {
            type: String,
            required: [true, 'Author image is required']
        },
        authorTitle: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;