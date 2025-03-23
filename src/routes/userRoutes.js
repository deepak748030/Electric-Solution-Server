import express from 'express';
import { sendOtp, createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Send OTP Route
router.post('/send-otp', sendOtp);

// Create User Route
router.post('/register', createUser);

// Login Route
router.post('/login', loginUser);

export default router;