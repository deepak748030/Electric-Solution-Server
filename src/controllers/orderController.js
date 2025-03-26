import Order from '../models/orderModel.js';

// ✅ Create Order
export const createOrder = async (req, res) => {
    try {
        const { userId, customer, email, phone, service, price, date, status, address } = req.body;

        if (!userId || !customer || !phone || !service || !price || !date || !status || !address) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Generate OrderId in the format ORD-01, ORD-02, ...
        const orderCount = await Order.countDocuments();
        const orderId = `ORD-${String(orderCount + 1).padStart(2, '0')}`;

        const newOrder = new Order({ orderId, userId, customer, phone, service, price, date, status, address });
        await newOrder.save();

        res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('userId', 'name email');
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Orders by UserId
export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate('userId', 'name email');
        if (!orders || orders.length === 0) return res.status(404).json({ success: false, message: 'No orders found for this user' });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Order (PATCH)
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const order = await Order.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.status(200).json({ success: true, message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Order by UserId (PATCH)
export const updateOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const order = await Order.findOneAndUpdate({ userId }, updates, { new: true, runValidators: true }).populate('userId', 'name email');
        if (!order) return res.status(404).json({ success: false, message: 'Order not found for this user' });
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
