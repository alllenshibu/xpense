const { pool } = require('../config/postgres.config.js');

const jwt = require('jsonwebtoken');

const LoginController = async (req, res, next) => {

  console.log(req.body.username + " " + req.body.password)
  const username = req.body.username;
  const password = req.body.password;
  const user =(await pool.query('SELECT * FROM users WHERE username = $1;', [username])).rows[0]
  if (!user) {
    const error = new Error('User does not exist');
    return next(error);
  }

  if (user.user_pwd !== password) {
    const error = new Error('Password is incorrect');
    return next(error);
  }

  let userToken;

  try {
    userToken = jwt.sign({ user_id: user.user_id, username: user.username }, process.env.SECRETKEY, { expiresIn: '1h' });
  } catch (err) {
    const error = new Error('Could not log you in, please try again later');
    return next(error);
  }

    console.log(username + " logged in")
    res.status(201)
      
    res.json({ message: 'Logged in successfully' , token: userToken , userId : user.user_id});
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
    token = jwt.sign({ username: user.username, user_id: user.user_id }, process.env.SECRETKEY, { expiresIn: '1h' });
  } catch (err) {
    const error = new Error('Could not log you in, please try again later');
    return next(error);
  }

  res
    .status(201)
    .json({ message: 'User created successfully' , token: token });
};



module.exports = { LoginController, RegisterController };
