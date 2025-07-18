import React, { useEffect, useState } from 'react';

const BACKEND_URL = "https://daaruwala-backend-5i6g.onrender.com/api/products";

const categories = [
  { name: "Whiskey" },
  { name: "Rum" },
  { name: "Beer" },
  { name: "Vodka" },
  { name: "Snacks" },
  { name: "Mixers" },
  { name: "Cigarette" }
];

// New Dark Theme Colors
const darkBg = "#18181b";
const cardBg = "#232946";
const accent = "#eebbc3";
const text = "#fff";
const faded = "#b8c1ec";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products by category AND search term
  const filteredProducts = products
    .filter(p => selectedCategory ? (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) : true)
    .filter(p => searchTerm ? (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) : true);

  return (
    // We use padding on the inner section now, not the main tag
    <main style={{ background: darkBg, minHeight: "100vh", color: text }}>
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

        {/* --- Search Bar --- */}
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
              border: "1px solid #393e6b",
              background: '#232946',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>
        
        {/* Sticky Category Bar */}
        <div
          className="sticky-categories"
          style={{
            position: "sticky",
            top: 80, // Adjusted for header height
            zIndex: 99,
            background: cardBg,
            padding: "12px 0",
            marginBottom: "2.5rem",
            boxShadow: "0 2px 8px #0001"
          }}
        >
          <div
            className="category-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "1rem",
              maxWidth: "900px",
              margin: "0 auto",
              padding: '0 1rem'
            }}
          >
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  background: selectedCategory === cat.name ? accent : cardBg,
                  color: selectedCategory === cat.name ? darkBg : accent,
                  border: `2px solid ${accent}`,
                  borderRadius: "10px",
                  padding: "1rem 0",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* ... (rest of the component is the same as your dark theme version) ... */}
        {selectedCategory && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <button
              onClick={() => setSelectedCategory("")}
              style={{
                background: faded,
                color: darkBg,
                border: "none",
                borderRadius: "6px",
                padding: "0.4rem 1.2rem",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Show All Products
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: '0 1rem'
          }}>
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: accent, fontSize: '1.2rem' }}>
                No products found.
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product._id} style={{
                  background: cardBg,
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 2px 8px #0002",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <img src={product.imageUrl || "https://via.placeholder.com/120x180?text=No+Image"} alt={product.name} style={{ width: "120px", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                  <h2 style={{ margin: "1rem 0 0.5rem", fontSize: "1.1rem", color: accent }}>{product.name}</h2>
                  <div style={{ color: faded, marginBottom: "0.5rem" }}>{product.category}</div>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#fff" }}>₹{product.price}</div>
                  <button
                    style={{
                      background: accent,
                      color: darkBg,
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.5rem 1.2rem",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
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