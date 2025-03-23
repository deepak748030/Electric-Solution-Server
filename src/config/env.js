import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const IMAGE_UPLOAD_URL = process.env.IMAGE_UPLOAD_URL || 'http://localhost:3000';
// console.log(PORT, MONGO_URI, JWT_SECRET, IMAGE_UPLOAD_URL);
export { PORT, MONGO_URI, JWT_SECRET, IMAGE_UPLOAD_URL };
