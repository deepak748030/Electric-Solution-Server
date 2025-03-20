import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createReview, getAllReviews, getReviewById, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', upload.single('authorImage'), createReview);
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.patch('/:id', upload.single('authorImage'), updateReview);
router.delete('/:id', deleteReview);

export default router;
