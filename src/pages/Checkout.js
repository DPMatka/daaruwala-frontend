import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DELIVERY_CHARGE = 150;

const Checkout = ({ cart, clearCart, setCart }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const user = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Quantity controls
    const handleQuantityChange = (productId, newQty) => {
        setCart(cart.map(item =>
            item._id === productId
                ? { ...item, quantity: Math.max(1, Number(newQty)) }
                : item
        ));
    };

    const handleRemove = (productId) => {
        setCart(cart.filter(item => item._id !== productId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.phone || !form.address) {
            alert('Please fill all the fields.');
            return;
        }

        const items = cart.map(item => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl
        }));

        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalAmount = subtotal + DELIVERY_CHARGE;

        const orderData = {
            userId: user?.user?._id || null,
            items,
            totalAmount,
            deliveryCharge: DELIVERY_CHARGE,
            deliveryAddress: form.address,
            contactNumber: form.phone
        };

        try {
            const response = await fetch('https://daaruwala-backend-5i6g.onrender.com/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            alert('✅ Order Placed Successfully!');
            clearCart(); // Clear cart from frontend
            navigate('/order-confirmation'); // Redirect to thank you page
        } catch (error) {
            alert('❌ Failed to place order. Try again.');
            console.error(error);
        }
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const grandTotal = subtotal + DELIVERY_CHARGE;

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <>
                    <table className="mb-4 w-full">
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
                    <div className="mb-2 font-semibold text-purple-700">
                        Delivery Charge (up to 10km): ₹{DELIVERY_CHARGE}
                    </div>
                    <div className="mb-4 text-yellow-700 text-sm">
                        <b>Note:</b> For more than 10km, delivery charges will be extra depending on distance.
                    </div>
                    <div className="mb-4 font-bold text-right">
                        Grand Total: ₹{grandTotal}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        <textarea
                            name="address"
                            placeholder="Delivery Address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700"
                        >
                            Place Order
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Checkout;