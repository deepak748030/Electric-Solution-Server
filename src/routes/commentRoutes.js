import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createComment, getAllComments, getCommentById, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();


router.post('/', upload.single('image'), createComment);
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.patch('/:id', upload.single('image'), updateComment);
router.delete('/:id', deleteComment);

export default router;