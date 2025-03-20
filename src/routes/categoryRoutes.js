import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

// Routes
router.post('/', upload.single('image'), createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

export default router;
