import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    updateOrder,
    updateOrderByUserId,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// ✅ Create Order
router.post('/', createOrder);

// ✅ Get All Orders
router.get('/', getAllOrders);

// ✅ Get Order by ID
router.get('/:id', getOrderById);

// ✅ Get Orders by UserId
router.get('/user/:userId', getOrdersByUserId);

// ✅ Update Order (PATCH)
router.patch('/:id', updateOrder);

// ✅ Update Order by UserId (PATCH)
router.patch('/user/:userId', updateOrderByUserId);

// ✅ Delete Order
router.delete('/:id', deleteOrder);

export default router;