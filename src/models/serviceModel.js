// models/serviceModel.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        price: {
            type: String,
            required: [true, 'Price is required']
        },
        image: {
            type: String,
            // required: [true, 'Image is required']
        },
        category: {
            type: String,
            required: [true, 'Category is required']
        },
        providerName: {
            type: String,
            required: [true, 'Provider name is required']
        },
        providerImage: {
            type: String,
            // required: [true, 'Provider image is required']
        },
        rating: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            enum: ['popular', 'featured'],
            required: [true, 'Type is required']
        }
    },
    { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;