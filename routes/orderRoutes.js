const express = require('express');
const {
    getAllOrders,
    createOrder,
    updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

// 📥 GET all orders (for admin dashboard)
router.get('/', getAllOrders);

// 🛒 POST a new order (when user places an order)
router.post('/', createOrder);

// 🔄 UPDATE status of an order (admin updates status)
router.put('/:id', updateOrderStatus);

module.exports = router;