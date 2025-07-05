const Order = require('../models/Order');

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    const { userId, items, totalAmount, deliveryAddress, contactNumber } = req.body;
    try {
        const newOrder = new Order({ userId, items, totalAmount, deliveryAddress, contactNumber });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllOrders, createOrder, updateOrderStatus };