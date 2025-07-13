// 🌐 This is your LIVE backend API hosted on Render
const API_URL = 'https://daaruwala-backend-5i6g.onrender.com/api'; 

/**
 * 🔄 Fetch all products
 */
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

/**
 * 📦 Fetch a single product by product ID
 * @param {string} productId - Unique Mongo `_id` or product code
 */
export const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
};

// 🧠 Example for future users and admin
/*
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};
*/