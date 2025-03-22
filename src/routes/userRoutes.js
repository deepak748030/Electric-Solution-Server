// routes/userRoutes.js
import express from 'express';
import {
    createUser,
    getAllUsers,
    // getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get user by ID
// router.get('/:id', getUserById);

// Update user by ID (excluding role updates)
router.patch('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);

export default router;
