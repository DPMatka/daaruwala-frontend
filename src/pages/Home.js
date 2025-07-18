import React, { useEffect, useState } from 'react';

const BACKEND_URL = "https://daaruwala-backend-5i6g.onrender.com/api/products";

const categories = [
  { name: "Whiskey" }, { name: "Rum" }, { name: "Beer" }, { name: "Vodka" },
  { name: "Snacks" }, { name: "Mixers" }, { name: "Cigarette" }
];

// White Theme Colors
const mainBg = "#f7f7fa";
const cardBg = "#fff";
const accent = "#7c1c4b";
const text = "#222";
const faded = "#888";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    <main style={{ background: mainBg, minHeight: "100vh", color: text }}>
      <section style={{ padding: "2rem 1rem" }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "2rem",
          color: accent,
          letterSpacing: "1px"
        }}>
          Order Alcohol & Snacks 24/7 in Indore
        </h2>

        <div style={{ maxWidth: "500px", margin: "0 auto 2rem auto" }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "12px", 
              borderRadius: "8px", 
              border: "1px solid #ddd",
              fontSize: '1rem'
            }}
          />
        </div>
        
        {/* --- Professional Sticky Category Bar --- */}
        <div className="category-bar">
          <div className="category-grid-container">
            <div className="category-grid">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  // This line adds the "selected" class to the button that is clicked
                  className={`category-btn ${selectedCategory === cat.name ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {selectedCategory && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <button
              onClick={() => setSelectedCategory("")}
              style={{ background: '#ddd', color: text, border: "none", borderRadius: "6px", padding: "0.4rem 1.2rem", cursor: "pointer", fontWeight: "bold" }}
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
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: accent, fontSize: '1.2rem' }}>
                No products found.
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product._id} style={{ background: cardBg, borderRadius: "12px", padding: "1rem", boxShadow: "0 2px 8px #0002", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img src={product.imageUrl || "https://via.placeholder.com/120x180?text=No+Image"} alt={product.name} style={{ width: "120px", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                  <h2 style={{ margin: "1rem 0 0.5rem", fontSize: "1.1rem", color: accent }}>{product.name}</h2>
                  <div style={{ color: faded, marginBottom: "0.5rem" }}>{product.category}</div>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem", color: text }}>₹{product.price}</div>
                  <button
                    style={{ background: accent, color: '#fff', border: "none", borderRadius: "6px", padding: "0.5rem 1.2rem", cursor: "pointer", fontWeight: "bold" }}
                    onClick={() => addToCart && addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;