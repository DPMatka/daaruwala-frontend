import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Product not found or an error occurred.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center text-lg py-10">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-600 text-xl py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/400?text=Product'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 text-lg mb-3">{product.category}</p>
          <p className="text-gray-700 mb-6">{product.description || "No description available."}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-4">₹{product.price}</p>

          {/* Stock Status */}
          <p className="text-gray-600 mb-6">
            <span className={product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stockQuantity > 0
                ? `In Stock (${product.stockQuantity} available)`
                : 'Out of Stock'}
            </span>
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product._id)}
            disabled={product.stockQuantity === 0}
            className={`w-full text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors ${
              product.stockQuantity > 0
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;