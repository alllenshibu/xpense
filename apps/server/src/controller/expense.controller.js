const {
  getAllExpenses,
  getExpenseByCategories,
  addNewExpense,
  getCategoryExpenses,
  getExpensesOnDate,
  EditExpense,
} = require('../services/expense.service.js');
const { getUserId } = require('../services/users.service.js');
const { getAllShares } = require('../services/shares.service.js');
const { getCategoryId } = require('../services/categories.service.js');

const { pool } = require('../config/postgres.config.js');

const getAllExpensesController = async (req, res) => {

  const username =  req.params.username; 
  const user     =  await getUserId(username);  
  const expenses =  await getAllExpenses(user);
  const shares   =  await getAllShares(user);

  res.status(200).json([...shares, ...expenses]);
};

const EditExpenseController = async (req, res) => {
  const username = req.params.username;
  const expense = req.body.expense;
  const success = await EditExpense(username, expense);
  if (success) {
    res.status(200).json('Expense edited successfully');
  } else {
    res.status(400).json('Error editing expense');
  }
};

const getExpenseByCategoriesController = async (req, res) => {
  const username = req.params.username;

  const userId = await getUserId(username);
  const result = await getExpenseByCategories(userId);
  res.status(200).json(result);
};

const getExpensesOnDateController = async (req, res) => {
  const username = req.params.username;
  const date = req.body.date;
  const userId = await getUserId(username);
  const result = await getExpensesOnDate(userId, date);
  res.status(200).json({
    success: true,
    expenses: result,
  });
};

const addExpenseController = async (req, res) => {
  const username = req.params.username;
  const expense = req.body.expense;
  const success = await addNewExpense(username, expense);
  if (success) {
    res.status(200).json('Expense added successfully');
  } else {
    res.status(400).json('Error adding expense');
  }
};

const getCategoryExpensesController = async (req, res) => {
  const username = req.params.username;
  const category = req.body.category;
  const userId = await getUserId(username);
  const categ_id = await getCategoryId(userId, category);
  const result = await getCategoryExpenses(userId, categ_id);
  res.status(200).json(result);
};

module.exports = {
  getAllExpensesController,
  getExpenseByCategoriesController,
  addExpenseController,
  getCategoryExpensesController,
  getExpensesOnDateController,
  EditExpenseController,
  
};
