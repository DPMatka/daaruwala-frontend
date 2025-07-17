import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id || user?._id || null;

  useEffect(() => {
    if (!userId) return;
    fetch(`https://daaruwala-backend-5i6g.onrender.com/api/orders/user/${userId}`)
      .then(res => res.json())
      .then(setOrders);
  }, [userId]);

  if (!userId) return <div className="text-center mt-10">Please login to view your orders.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-4 border-b pb-2">
              <div><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</div>
              <div>
                <b>Status:</b>
                <span style={{
                  marginLeft: 8,
                  padding: "2px 10px",
                  borderRadius: 8,
                  background: order.status === "Pending" ? "#fef08a"
                    : order.status === "Processing" ? "#bae6fd"
                    : order.status === "Shipped" ? "#dbeafe"
                    : order.status === "Delivered" ? "#bbf7d0"
                    : order.status === "Cancelled" ? "#fecaca"
                    : "#e5e7eb",
                  color: "#222",
                  fontWeight: "bold"
                }}>
                  {order.status}
                </span>
              </div>
              <div><b>Items:</b>
                <ul>
                  {order.items.map(item => (
                    <li key={item.productId}>{item.name} x {item.quantity} @ ₹{item.price}</li>
                  ))}
                </ul>
              </div>
              <div><b>Delivery:</b> ₹{order.deliveryCharge}</div>
              <div><b>Total:</b> ₹{order.totalAmount}</div>
              <div><b>Address:</b> {order.deliveryAddress}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;