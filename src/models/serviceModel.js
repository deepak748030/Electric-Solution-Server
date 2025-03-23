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
            type: String
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
            type: String
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
        },
        locations: {
            type: [String], // Array of strings for multiple locations
            required: [true, 'At least one location is required']
        }
    },
    {
        timestamps: true,
        versionKey: false // Disable version key (__v)
    }

);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
