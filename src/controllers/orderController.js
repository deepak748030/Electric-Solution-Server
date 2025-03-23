// controllers/orderController.js
import Order from '../models/orderModel.js';

// ✅ Create Order
export const createOrder = async (req, res) => {
    try {
        const { orderId, customer, email, phone, service, price, date, status, address } = req.body;

        if (!orderId || !customer || !email || !phone || !service || !price || !date || !status || !address) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newOrder = new Order({ orderId, customer, email, phone, service, price, date, status, address });
        await newOrder.save();

        res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Order (PATCH)
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const order = await Order.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.status(200).json({ success: true, message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
