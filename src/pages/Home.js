import React, { useEffect, useState } from 'react';

const BACKEND_URL = "https://daaruwala-backend-5i6g.onrender.com/api/products";

const categories = [
  { name: "Whiskey" },
  { name: "Beer" },
  { name: "Vodka" },
  { name: "Rum" },
  { name: "Snacks" },
  { name: "Mixers" },
  { name: "Cigarette" }
];

const darkBg = "#232946";
const cardBg = "#393e6b";
const accent = "#eebbc3";
const text = "#fff";
const faded = "#b8c1ec";

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
    <main style={{ background: darkBg, minHeight: "100vh", color: text, padding: "2rem" }}>
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

        {/* Category Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2.5rem",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          {categories.map(cat => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                background: selectedCategory === cat.name ? accent : cardBg,
                color: selectedCategory === cat.name ? darkBg : accent,
                borderRadius: "10px",
                boxShadow: "0 2px 8px #0002",
                padding: "1.5rem 0",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                border: selectedCategory === cat.name ? `2px solid ${accent}` : `2px solid ${cardBg}`,
                transition: "all 0.2s"
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* Show all products if no category selected */}
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