const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

// Middleware to verify JWT token and normalize req.user
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Normalize client (nested user object) and staff (flat object) payloads
    req.user = decoded.user || decoded;
    // Ensure req.user._id is set for consistency
    req.user._id = req.user.id;
    // console.log('verifyToken: req.user=', {
    //   _id: req.user._id,
    //   role: req.user.role,
    //   email: req.user.email,
    // });
    next();
  } catch (error) {
    // console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;