import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DELIVERY_CHARGE = 150;

const ShoppingCart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Update quantity
  const handleQuantityChange = (productId, quantity) => {
    setCart(cart.map(item =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, Number(quantity)) }
        : item
    ));
  };

  // Remove item
  const handleRemove = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_CHARGE;

  // Go to checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 12px #0002" }}>
      <h2 style={{ color: "#7c1c4b", marginBottom: "1.5rem" }}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>
          Your cart is empty. <Link to="/">Go shopping!</Link>
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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      style={{ marginRight: 5, padding: "0 8px", fontWeight: "bold" }}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item._id, e.target.value)}
                      style={{ width: "40px", textAlign: "center" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      style={{ marginLeft: 5, padding: "0 8px", fontWeight: "bold" }}
                    >+</button>
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(item._id)}
                      style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </td>
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
              onClick={handleCheckout}
              style={{ background: "#7c1c4b", color: "#fff", border: "none", borderRadius: "6px", padding: "0.7rem 2rem", fontWeight: "bold", cursor: "pointer" }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;