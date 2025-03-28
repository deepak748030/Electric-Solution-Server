import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Create order
router.post('/create-order', createOrder);

// Verify payment
router.post('/verify', verifyPayment);

export default router;