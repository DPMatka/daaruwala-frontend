import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, clearCart }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.phone || !form.address) {
            alert('Please fill all the fields.');
            return;
        }

        const items = cart.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price
        }));

        const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderData = {
            userId: null, // or provide user ID if logged in
            items,
            totalAmount,
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

            const result = await response.json();
            alert('✅ Order Placed Successfully!');
            clearCart(); // Clear cart from frontend
            navigate('/order-confirmation'); // Redirect to thank you page
        } catch (error) {
            alert('❌ Failed to place order. Try again.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="mb-4">
                        {cart.map(item => (
                            <li key={item._id} className="mb-2">
                                {item.name} x {item.quantity} = ₹{item.quantity * item.price}
                            </li>
                        ))}
                    </ul>

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