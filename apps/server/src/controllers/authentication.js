const prisma = require('../utils/database');

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: 'Missing fields',
      });
    }

    const users = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (users) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    return res.status(200).json({
      message: 'User created',
      token: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credetials',
      });
    }

    return res.status(200).json({
      message: 'Successfully logged in',
      token: user.id,
      token: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  signup,
  login,
};
