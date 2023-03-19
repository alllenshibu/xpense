
const verifyToken = (req, res, next) => {

    const path = req.path.toLowerCase();
    if (path === '/login' || path === '/register') {
        
        return next();
    }
    console.log(req.path)
    const token = req.cookies.token;
    if (!token) {
      const error = new Error('Not authenticated');
      return res.status(403).json({success:false ,  message: 'Not authenticated' });
    }
  
    jwt.verify(token , "This is a secret" , (err, decodedToken) => {
      if (err) {
        const error = new Error('Not authenticated');
        return res.status(403).json({success:false ,  message: 'Not authenticated' });
      }
      req.username = decodedToken.username;
    });
    next();
  };

  module.exports = verifyToken;