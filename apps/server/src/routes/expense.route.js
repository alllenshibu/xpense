const express = require('express');
const router = express.Router();

const {
  addExpenseController,
  getAllExpensesController,
  getExpenseByCategoriesController,
  getCategoryExpensesController,
  getExpensesOnDateController
} = require('../controller/expense.controller.js');

router.get('/', (req, res) => {
  res.send('Expense');
});


router.get('/getall', getAllExpensesController);

router.get('/analysis', (req, res) => {
  res.send('Get expense analysis like insights, trends, etc.');
});

router.post('/add', addExpenseController);

router.post('/getsum-c', getExpenseByCategoriesController);

router.post('/get-bc', getCategoryExpensesController);

router.post('/get-bd/:username', getExpensesOnDateController);

module.exports = router;
