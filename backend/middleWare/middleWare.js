require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from 'Bearer <token>' format

  if (!token) return res.sendStatus(401); // No token

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // console.error('JWT verification failed:', err.message);
      return res.sendStatus(403); // Invalid token
    }

    // console.log('Raw JWT payload:', decoded); // Debug log

    // Extract user data (handle nested 'user' object)
    const userData = decoded.user || decoded;

    // Validate required fields
    if (!userData || (!userData.id && !userData._id) || !userData.role) {
      // console.error('Invalid token payload: missing id or role', userData);
      return res.status(403).json({ success: false, message: 'Invalid token payload' });
    }

    // Set req.user with normalized fields
    req.user = {
      _id: userData._id || userData.id,
      role: userData.role.toLowerCase() || 'user',
      ...userData, // Include other fields for compatibility
    };

    // console.log('Authenticated user:', req.user); // Debug log
    next();
  });
};

// Middleware to check if the user is an Admin (unchanged for staff logic)
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    // console.log(req.user.role);
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
};