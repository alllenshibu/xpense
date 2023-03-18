const express = require('express');
const { pool } = require('../config/postgres.config');
const AddCategoryController = require('../controller/AddCategoryController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Category');
});

router.get('/get', (req, res) => {
  res.send('Get category');
});

router.post('/add', AddCategoryController);
module.exports = router;
