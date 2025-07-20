import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import ShoppingCart from './pages/ShoppingCart';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrders';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [searchTerm, setSearchTerm] = useState("");

  // --- THIS IS THE ONLY CHANGE: New, advanced cart function ---
  const handleQuantityChange = (product, newQuantity) => {
    const quantity = Math.max(0, newQuantity); // Quantity can't be less than 0
    const existingItem = cart.find(item => item._id === product._id);

    if (quantity === 0) {
      // If quantity is 0, remove the item from the cart
      setCart(cart.filter(item => item._id !== product._id));
    } else if (existingItem) {
      // If item is already in cart, update its quantity
      setCart(cart.map(item => item._id === product._id ? { ...item, quantity } : item));
    } else {
      // If item is not in cart, add it with the new quantity
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      {/* The cart count now correctly sums up the quantities of all items */}
      <Header cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="social-icons">
        <a 
          href="https://wa.me/918407952886"
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.902-.539-5.587-1.52l-6.19 1.669zm4.38-1.488l.192.115c1.556.92 3.344 1.413 5.223 1.413 5.478 0 9.961-4.483 9.961-9.961s-4.483-9.961-9.961-9.961-9.961 4.483-9.961 9.961c0 2.019.59 3.914 1.638 5.53l.124.198-1.015 3.714 3.715-1.015z"/>
          </svg>
        </a>
        <a 
          href="https://t.me/daaruwala"
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon telegram"
          aria-label="Contact on Telegram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="white">
            <path d="M9.78 18.33l-1.41 4.94c-.15.53.51.87.94.59l4.33-2.93 5.42 4.4c.52.42 1.27.02 1.39-.62l3.1-14.94c.14-.65-.45-1.22-1.09-1.01l-18.15 7.1c-.65.25-.66.97-.03 1.24l4.6 1.63 1.56-6.66c.4-.25.77.16.42.43l-8.47 7.7z"/>
          </svg>
        </a>
      </div>
      
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          </>
        ) : (
          <>
            {/* We now pass the cart and the new function to the Home page */}
            <Route path="/" element={<Home cart={cart} handleQuantityChange={handleQuantityChange} searchTerm={searchTerm} />} />
            <Route path="/product/:productId" element={<ProductDetail handleQuantityChange={handleQuantityChange} />} />
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} setCart={setCart} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;