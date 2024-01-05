const prisma = require('../utils/database');

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: token,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  authorize,
};
