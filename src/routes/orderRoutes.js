// routes/orderRoutes.js
import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// ✅ Create Order
router.post('/', createOrder);

// ✅ Get All Orders
router.get('/', getAllOrders);

// ✅ Get Order by ID
router.get('/:id', getOrderById);

// ✅ Update Order (PATCH)
router.patch('/:id', updateOrder);

// ✅ Delete Order
router.delete('/:id', deleteOrder);

export default router;
