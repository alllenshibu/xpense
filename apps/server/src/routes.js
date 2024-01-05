const express = require('express');
const { signup, login } = require('./controllers/authentication');
const { authorize } = require('./middlewares/authorize');

const {
  addNewIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} = require('./controllers/income');
const {
  addNewPaymentOption,
  getAllPaymentOptions,
  getPaymentOptionById,
  updatePaymentOption,
  deletePaymentOption,
} = require('./controllers/paymentOption');

const {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('./controllers/category');

const {
  addNewExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('./controllers/expense');
const { computeStats } = require('./controllers/stats');

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);

router.get('/stats', authorize, computeStats);

router.post('/income', authorize, addNewIncome);
router.get('/income', authorize, getAllIncomes);
router.get('/income/:id', authorize, getIncomeById);
router.put('/income/:id', authorize, updateIncome);
router.delete('/income/:id', authorize, deleteIncome);

router.post('/payment-option', authorize, addNewPaymentOption);
router.get('/payment-option', authorize, getAllPaymentOptions);
router.get('/payment-option/:id', authorize, getPaymentOptionById);
router.put('/payment-option/:id', authorize, updatePaymentOption);
router.delete('/payment-option/:id', authorize, deletePaymentOption);

router.post('/category', authorize, addNewCategory);
router.get('/category', authorize, getAllCategories);
router.get('/category/:id', authorize, getCategoryById);
router.put('/category/:id', authorize, updateCategory);
router.delete('/category/:id', authorize, deleteCategory);

router.post('/expense', authorize, addNewExpense);
router.get('/expense', authorize, getAllExpenses);
router.get('/expense/:id', authorize, getExpenseById);
router.put('/expense/:id', authorize, updateExpense);
router.delete('/expense/:id', authorize, deleteExpense);

module.exports = router;
