const express = require('express');
const {
    getAllOrders,
    createOrder,
    updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);

module.exports = router;