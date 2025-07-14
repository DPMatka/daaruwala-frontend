import React, { useEffect, useState } from 'react';

const BACKEND_URL = "https://daaruwala-backend-5i6g.onrender.com/api/products"; 

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: "#18181b", minHeight: "100vh", color: "#fff", padding: "2rem" }}>
      <section>
        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginBottom: "2rem" }}>
          Order Alcohol & Snacks 24/7 in Indore
        </h2>
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
            {products.map(product => (
              <div key={product._id} style={{
                background: "#23232a",
                borderRadius: "12px",
                padding: "1rem",
                boxShadow: "0 2px 8px #0002",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img src={product.imageUrl || "https://via.placeholder.com/120x180?text=No+Image"} alt={product.name} style={{ width: "120px", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                <h2 style={{ margin: "1rem 0 0.5rem", fontSize: "1.1rem" }}>{product.name}</h2>
                <div style={{ color: "#aaa", marginBottom: "0.5rem" }}>{product.category}</div>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.5rem" }}>₹{product.price}</div>
                <button
                  style={{
                    background: "#a21caf",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    cursor: "pointer"
                  }}
                  onClick={() => addToCart && addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;