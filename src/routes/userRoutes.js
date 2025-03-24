import express from 'express';
import { sendOtp, createUser, loginUser, getUserById, updateUser, getAllUsers, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Send OTP Route
router.post('/send-otp', sendOtp);

// Create User Route
router.post('/register', createUser);

// Login Route
router.post('/login', loginUser);

// Get User by ID Route
router.get('/:id', getUserById);

// Get User by ID Route
router.get('/', getAllUsers);

// Update User Route
router.patch('/:id', updateUser);

// Update User Route
router.patch('/profile/:id', updateUserProfile);


export default router;