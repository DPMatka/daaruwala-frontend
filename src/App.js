import React, { useState } from 'react'; // <-- THIS LINE IS NOW CORRECT
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
  
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
    alert(`✅ ${product.name} added to cart!`);
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <Header cartItemCount={cart.length} />

      {/* --- Floating Social Icons --- */}
      <div className="social-icons">
        <a 
          href="https://wa.me/YOUR_PHONE_NUMBER" // <-- IMPORTANT: Replace
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon whatsapp"
          aria-label="Chat on WhatsApp"
        >
          💬
        </a>
        <a 
          href="https://t.me/YOUR_TELEGRAM_USERNAME" // <-- IMPORTANT: Replace
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon telegram"
          aria-label="Contact on Telegram"
        >
          ➤
        </a>
      </div>
      
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="*" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} />} />
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
    Router>
  );
};

export default App;