const jwt = require('jsonwebtoken');
const SECRET_KEY = '123';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

 
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  try {
   
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {

    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
