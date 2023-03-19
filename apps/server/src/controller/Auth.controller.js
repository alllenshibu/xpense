const { pool } = require('../config/postgres.config.js');

const jwt = require('jsonwebtoken');

const LoginController = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await pool.query('SELECT * FROM users WHERE username = $1;', [username]).then((response) => {
    return response.rows[0];
  });
  if (!user) {
    const error = new Error('User does not exist');
    return next(error);
  }

  if (user.user_pwd !== password) {
    const error = new Error('Password is incorrect');
    return next(error);
  }

  let token;

  try {
    token = jwt.sign({ user_id: user.user_id, username: user.username }, 'Whatasecret', { expiresIn: '1h' });
  } catch (err) {
    const error = new Error('Could not log you in, please try again later');
    return next(error);
  }


    res.status(200)
    .cookie('accessToken', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
    })
    .json({ message: 'Logged in successfully' , token: token });
};

const RegisterController = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const user_id = await pool.query('SELECT user_id FROM users WHERE username = $1;', [username]).then((response) => {
    console.log('User ID: ' + response.rowCount);
    return response.rowCount > 0;
  });
  if (user_id) {
    const error = new Error('User already exists');
    return next(error);
  }
  const user = await pool
    .query('INSERT INTO users (username, user_pwd) VALUES ($1, $2) RETURNING username , user_id ;', [
      username,
      password,
    ])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      const error = new Error('Error occured');
      return next(error);
    });

  let token;

  try {
    token = jwt.sign({ username: user.username, user_id: user.user_id }, 'This is a secret', { expiresIn: '1h' });
  } catch (err) {
    const error = new Error('Could not log you in, please try again later');
    return next(error);
  }

  res
    .status(201)
    .cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    })
    .json({ message: 'User created successfully' , token: token });
};

module.exports = { LoginController, RegisterController };
