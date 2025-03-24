import mongoose from 'mongoose';
import { MONGO_URI } from '../config/env.js';

export const connectDB = async () => {
    try {
        console.log('📡 Connecting to the database...');
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❗ MongoDB connection error:', error.message);
        process.exit(1);
    }
};
