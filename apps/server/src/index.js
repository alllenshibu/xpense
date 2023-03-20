const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const { pool } = require('./config/postgres.config.js');
const verifyToken = require('./middleware/verifyToken.js');
const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}));
const port = process.env.PORT || 3002;

if (pool) {
  console.log('Connected to Postgres');
} else {
  console.log('Error connecting to Postgres');
}


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(verifyToken);
app.use('/expense', require('./routes/expense.route.js'));
app.use('/category', require('./routes/category.route.js'));
app.use('/friends', require('./routes/friends.route.js'));
app.use('/', require('./routes/auth.route.js'));

app.post('/adduser', (req, res) => {
  const username = req.body.username;
  res.send('Add user ' + username);
  pool
    .query('INSERT INTO users (username) VALUES ($1);', [username])
    .then((res) => {
      console.log('User added successfully' + res);
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
