require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from 'Bearer <token>' format
  
    if (token == null) return res.sendStatus(401); // No token
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
  
      req.user = user;
      next();
    });
};


// Middleware to check if the user is an Admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      console.log(req.user.role);
      return res.status(403).send('Access denied. Admins only.');
    }
    next();
};


module.exports = 
{
    authenticateToken,
    isAdmin,
};