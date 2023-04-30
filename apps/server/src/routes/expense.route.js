const express = require('express');
const router = express.Router();

const {
  addExpenseController,
  getAllExpensesController,
  getExpenseByCategoriesController,
  getCategoryExpensesController,
  getExpensesOnDateController,
  EditExpenseController,
  getCommonExpensesController,
} = require('../controller/expense.controller.js');

router.get('/', (req, res) => {
  res.send('Expense');
});

router.get('/getall/:username', getAllExpensesController);

router.get('/analysis/:username', (req, res) => {
  res.send('Get expense analysis like insights, trends, etc.');
});

router.post('/add/:username', addExpenseController);

router.post('/getsum-c/:username', getExpenseByCategoriesController);

router.post('/get-bc/:username', getCategoryExpensesController);

router.post('/get-bd/:username', getExpensesOnDateController);

router.post('/edit/:username', EditExpenseController);

router.post('/get-common/:username', getCommonExpensesController);


module.exports = router;
