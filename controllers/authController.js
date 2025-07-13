const Admin = require('../models/Admin');

// 🟩 Admin Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Simulate token (You can return JWT later)
    const token = 'daaruwala-admin-token';

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: admin.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// (Optional) Add register logic for admin if needed later
const register = async (req, res) => {
  res.status(400).json({ message: 'Admin registration not allowed via frontend' });
};

module.exports = {
  login,
  register,
};