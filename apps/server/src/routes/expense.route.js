const express = require('express');
const router = express.Router();

const {
  addExpenseController,
  getAllExpensesController,
  getExpenseByCategoriesController,
  getCategoryExpensesController,
} = require('../controller/expense.controller.js');

router.get('/', (req, res) => {
  res.send('Expense');
});

router.get('/get', (req, res) => {
  const expenseId = req.query.expenseId;
  const user = req.query.user;

  getExpenseDetails(user, expenseId);

  res.send('Get expense');
});

router.get('/getall/:username', getAllExpensesController);

router.get('/analysis', (req, res) => {
  res.send('Get expense analysis like insights, trends, etc.');
});

router.post('/add', addExpenseController);

router.post('/getsum-c', getExpenseByCategoriesController);

router.post('/get-bc', getCategoryExpensesController);

module.exports = router;
