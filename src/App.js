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
  // Use state to force re-render after login
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user"));

  // Add to cart with quantity
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

  // Clear cart after order placed
  const clearCart = () => setCart([]);

  return (
    <Router>
      <Header cartItemCount={cart.length} />
      <Routes>
        {/* If not logged in, always show Login page */}
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
    </Router>
  );
};

export default App;