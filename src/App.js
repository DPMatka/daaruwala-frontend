import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import ShoppingCart from './pages/ShoppingCart';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrders';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

const App = () => {
  const [cart, setCart] = useState([]);

  // ✅ Add to cart with quantity
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

  // ✅ Clear cart after order placed
  const clearCart = () => setCart([]);

  return (
    <Router>
      <Header cartItemCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
};

export default App;