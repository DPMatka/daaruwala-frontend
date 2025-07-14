import React from 'react';
import { useNavigate } from 'react-router-dom';

const DELIVERY_CHARGE = 150;

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_CHARGE;

  const handlePlaceOrder = () => {
    // Here you would send order to backend
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 12px #0002" }}>
      <h2 style={{ color: "#7c1c4b", marginBottom: "1.5rem" }}>Checkout</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>
          Your cart is empty.
        </div>
      ) : (
        <>
          <table style={{ width: "100%", marginBottom: "2rem" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginBottom: "1rem", color: "#7c1c4b", fontWeight: "bold" }}>
            Delivery Charge (up to 10km): ₹{DELIVERY_CHARGE}
          </div>
          <div style={{ marginBottom: "1.5rem", color: "#e67e22", fontSize: "0.95rem" }}>
            <b>Note:</b> For more than 10km, delivery charges will be extra depending on distance.
          </div>
          <div style={{ textAlign: "right", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "1.5rem" }}>
            Grand Total: ₹{total}
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handlePlaceOrder}
              style={{ background: "#7c1c4b", color: "#fff", border: "none", borderRadius: "6px", padding: "0.7rem 2rem", fontWeight: "bold", cursor: "pointer" }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;