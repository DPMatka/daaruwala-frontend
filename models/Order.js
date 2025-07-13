const mongoose = require('mongoose');

// 📦 This schema defines what an "order" looks like in the database
const orderSchema = new mongoose.Schema({
    // 👤 Who placed the order (optional if no login yet)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Set to true if login is required
    },

    // 🛍 What products they ordered
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],

    // 💵 Total bill for the order
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    // 📫 Shipping/delivery address
    deliveryAddress: {
        type: String,
        required: true
    },

    // 📞 Customer contact number
    contactNumber: {
        type: String,
        required: true
    },

    // 🔄 Order status (Pending / Shipped / Delivered etc.)
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }

}, { timestamps: true }); // automatically adds createdAt & updatedAt fields

// Export the Order model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;