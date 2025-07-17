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

const cardBg = "#fff";
const accent = "#7c1c4b";
const faded = "#888";
const text = "#222";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(""); // For filtering

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <main style={{ background: "#f7f7fa", minHeight: "100vh", color: text, padding: "2rem 0" }}>
      <section>
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

        {/* Sticky Category Bar */}
        <div
          className="sticky-categories"
          style={{
            position: "sticky",
            top: 64,
            zIndex: 99,
            background: "#fff",
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
              margin: "0 auto"
            }}
          >
            {categories.map(cat => (
              <button
                key={cat.name}
                className={`category-btn${selectedCategory === cat.name ? ' selected' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  background: selectedCategory === cat.name ? accent : "#fff",
                  color: selectedCategory === cat.name ? "#fff" : accent,
                  border: selectedCategory === cat.name ? `2px solid ${accent}` : `2px solid #eee`,
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

        {/* Show all products if no category selected */}
        {selectedCategory && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <button
              onClick={() => setSelectedCategory("")}
              style={{
                background: faded,
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.4rem 1.2rem",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Show All Categories
            </button>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: "center" }}>Loading products...</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: accent }}>
                No products found in this category.
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
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem", color: text }}>₹{product.price}</div>
                  <button
                    style={{
                      background: accent,
                      color: "#fff",
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