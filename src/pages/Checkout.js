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

    // Get the logged-in user (if any)
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user?._id || null;

    // If logged in, use user info for name/phone
    const displayName = user?.user?.name || form.name;
    const displayPhone = user?.user?.phone || form.phone;

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

        if (!displayName || !displayPhone || !form.address) {
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
            userId, // will be null for guests, or the user's _id if logged in
            items,
            totalAmount,
            deliveryCharge: DELIVERY_CHARGE,
            deliveryAddress: form.address,
            contactNumber: displayPhone,
            customerName: displayName // (optional, for admin panel)
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
                    <table className="mb-4 w-full" style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", padding: 8 }}>Product</th>
                                <th style={{ textAlign: "left", padding: 8 }}>Price (₹)</th>
                                <th style={{ textAlign: "left", padding: 8 }}>Quantity</th>
                                <th style={{ textAlign: "left", padding: 8 }}>Subtotal (₹)</th>
                                <th style={{ textAlign: "left", padding: 8 }}>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item._id}>
                                    <td style={{ padding: 8 }}>{item.name}</td>
                                    <td style={{ padding: 8 }}>{item.price}</td>
                                    <td style={{ padding: 8 }}>
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
                                    <td style={{ padding: 8 }}>{item.price * item.quantity}</td>
                                    <td style={{ padding: 8 }}>
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
                    {/* Professional customer details section */}
                    <div style={{
                        background: "#f9fafb",
                        borderRadius: 8,
                        padding: 20,
                        marginBottom: 24,
                        border: "1px solid #eee"
                    }}>
                        <div style={{ color: "#b91c1c", fontWeight: "bold", marginBottom: 12 }}>
                            Please fill the details correctly. Incorrect details can lead to your order being cancelled.
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontWeight: "bold" }}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Full Name"
                                        value={displayName}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                        required
                                        disabled={!!userId} // disable if logged in
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontWeight: "bold" }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={displayPhone}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                        required
                                        disabled={!!userId} // disable if logged in
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <label style={{ fontWeight: "bold" }}>Delivery Address</label>
                                <textarea
                                    name="address"
                                    placeholder="House No, Street, Area, City, Pincode"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;