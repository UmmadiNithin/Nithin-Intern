const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';


const authorize = (requiredRole) => (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (requiredRole && decoded.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied!' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token!' });
  }
};

module.exports = authorize;
