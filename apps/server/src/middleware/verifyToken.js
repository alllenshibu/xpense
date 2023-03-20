const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {

    const path = req.path.toLowerCase();
    if (path === '/login' || path === '/register') {
        return next();
    }
    console.log(req.path) //token authorization bearer
    
    try{
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
      }
      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
      }
      req.username = decodedToken.username;
      next();
    }catch(err){
    
      res.status(401).json({ message: err.message });
    }
  };

  module.exports = verifyToken;