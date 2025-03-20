import mongoose from 'mongoose';

// Define schema
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        image: {
            type: String,
            trim: true,
        },
        servicesCount: {
            type: String,
            required: [true, 'Services count is required'],
        },
    },
    { timestamps: true }
);


const Category = mongoose.model('Category', categorySchema);
export default Category;
