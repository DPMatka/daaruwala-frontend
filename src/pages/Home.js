import React, { useEffect, useState } from 'react';

const BACKEND_URL = "https://daaruwala-backend-5i6g.onrender.com/api/products";

const categories = [
  { name: "Whiskey" }, 
  { name: "Rum" }, 
  { name: "Beer" }, 
  { name: "Vodka" },
  { name: "Snacks" }, 
  { name: "Mixers" }, 
  { name: "Cigarette" },
  { name: "Party Supplies" }
];

const Home = ({ cart, handleQuantityChange, searchTerm }) => { // <-- Receive cart and the new function
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => selectedCategory ? (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) : true)
    .filter(p => searchTerm ? (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) : true);

  return (
    <main style={{ background: '#f7f7fa', minHeight: "100vh", color: '#222' }}>
      <section style={{ padding: "2rem 1rem" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginBottom: "2rem", color: '#7c1c4b' }}>
          Order Alcohol & Snacks 24/7 in Indore
        </h2>
        
        <div className="category-bar"> 
          <div className="category-grid">
            {categories.map(cat => (
              <button
                key={cat.name}
                className={`category-btn ${selectedCategory === cat.name ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        {selectedCategory && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <button
              onClick={() => setSelectedCategory("")}
              style={{ background: '#ddd', color: '#222', border: "none", borderRadius: "6px", padding: "0.4rem 1.2rem", cursor: "pointer", fontWeight: "bold" }}
            >
              Show All Products
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: '0 1rem' }}>
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: '#7c1c4b', fontSize: '1.2rem' }}>
                No products found.
              </div>
            ) : (
              filteredProducts.map(product => {
                // Check if this product is in the cart
                const cartItem = cart.find(item => item._id === product._id);
                const quantityInCart = cartItem ? cartItem.quantity : 0;

                return (
                  <div key={product._id} style={{ background: '#fff', borderRadius: "12px", padding: "1rem", boxShadow: "0 2px 8px #0002", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={product.imageUrl || "https://via.placeholder.com/120x180?text=No+Image"} alt={product.name} style={{ width: "120px", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                    <h2 style={{ margin: "1rem 0 0.5rem", fontSize: "1.1rem", color: '#7c1c4b' }}>{product.name}</h2>
                    <div style={{ color: '#888', marginBottom: "0.5rem" }}>{product.category}</div>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem", color: '#222' }}>₹{product.price}</div>
                    
                    {/* --- NEW: Conditional Quantity Controller --- */}
                    {quantityInCart > 0 ? (
                      // If item is in cart, show +/- buttons
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                        <button
                          onClick={() => handleQuantityChange(product, quantityInCart - 1)}
                          style={{ background: '#ddd', color: '#222', border: "none", borderRadius: "50%", width: '30px', height: '30px', fontWeight: "bold", cursor: "pointer" }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{quantityInCart}</span>
                        <button
                          onClick={() => handleQuantityChange(product, quantityInCart + 1)}
                          style={{ background: '#7c1c4b', color: '#fff', border: "none", borderRadius: "50%", width: '30px', height: '30px', fontWeight: "bold", cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      // If not in cart, show "Add to Cart" button
                      <button
                        style={{ background: '#7c1c4b', color: '#fff', border: "none", borderRadius: "6px", padding: "0.5rem 1.2rem", cursor: "pointer", fontWeight: "bold", marginTop: '8px' }}
                        onClick={() => handleQuantityChange(product, 1)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;