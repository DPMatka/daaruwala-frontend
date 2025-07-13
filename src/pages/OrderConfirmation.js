import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-4">Thank you for shopping with Daaruwala.</p>
      <Link
        to="/"
        className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;