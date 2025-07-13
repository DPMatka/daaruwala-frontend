const Order = require('../models/Order');
const Product = require('../models/Product'); // ✅ Required for stock management

// 🧾 Get all orders (for Admin Panel)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'username email')
      .populate('items.productId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// 🛍 Create a new order (user places it from frontend)
const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, deliveryAddress, contactNumber } = req.body;

    // ✅ Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in the order.' });
    }
    if (!totalAmount || !deliveryAddress || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // 🔄 Reduce stock for each product + validate availability
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `❌ Not enough stock for "${product.name}". Only ${product.stockQuantity} left.`,
        });
      }

      // ✅ Reduce stock and save product
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    // ✅ Save final order
    const newOrder = new Order({
      userId: userId || null,
      items,
      totalAmount,
      deliveryAddress,
      contactNumber,
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: '✅ Order placed successfully & stock updated.',
      order: savedOrder
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Order could not be placed.' });
  }
};

// 🔄 Update order status (admin updates to Processing, Shipped, etc.)
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: '✅ Order status updated.',
      order: updatedOrder
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: `Failed to update order: ${error.message}` });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrderStatus
};