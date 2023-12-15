const express = require('express');

const { signupController, loginController } = require('./controllers/auth.controller');
const {
  findUserByEmailController,
  deleteUserController,
} = require('./controllers/user.controller');
const { authorize } = require('./middlewares/auth.middleware');
const {
  addNewExpenseController,
  getAllExpensesController,
  getExpenseByIdController,
  editExpenseController,
  deleteExpenseController,
  getExpenseByMonthController,
} = require('./controllers/expense.controller');
const { getStatsController } = require('./controllers/stats.controller');
const { createNewSplitController } = require('./controllers/split.controller');
const {
  getAllCategoriesController,
  getCategoryByIdController,
  addNewCategoryController,
  editCategoryController,
  deleteCategoryController,
  getbyCategory,
} = require('./controllers/category.controller');
const {
  getAllFriendRequestsController,
  sendNewFriendRequestController,
  getAllFriendsController,
  acceptFriendRequestController,
} = require('./controllers/friend.controller');
const {
  getPaymentOptionByIdController,
  getAllPaymentOptionsController,
  addNewPaymentOptionController,
  editPaymentOptionController,
  deletePaymentOptionController,
} = require('./controllers/paymentOption.controller');

const { addNewIncomeController, getIncomeController, getIncomeByMonthController } = require('./controllers/income.controller');
const { getExpenseByMonth } = require('./services/expense.service');

const router = express.Router();

// Auth routes
router.post('/auth/signup', async (req, res) => {
  signupController(req, res);
});

router.post('/auth/login', async (req, res) => {
  loginController(req, res);
});

// User routes
router.get('/user/:email', (req, res) => {
  findUserByEmailController(req, res);
});

router.delete('/user', async (req, res) => {
  deleteUserController(req, res);
});

// Expense routes
router.get('/expense', authorize, (req, res) => {
  getAllExpensesController(req, res);
});

router.get('/expense/:id', authorize, (req, res) => {
  getExpenseByIdController(req, res);
});

router.post('/expense', authorize, (req, res) => {
  addNewExpenseController(req, res);
});

router.put('/expense', authorize, (req, res) => {
  editExpenseController(req, res);
});

router.delete('/expense', authorize, (req, res) => {
  deleteExpenseController(req, res);
});

// Category routes
router.get('/category', authorize, (req, res) => {
  getAllCategoriesController(req, res);
});

router.get('/category/:id', authorize, (req, res) => {
  getCategoryByIdController(req, res);
});

router.post('/category', authorize, (req, res) => {
  addNewCategoryController(req, res);
});

router.put('/category/:id', authorize, (req, res) => {
  editCategoryController(req, res);
});

router.delete('/category/:id', authorize, (req, res) => {
  deleteCategoryController(req, res);
});

// Payment option routes
router.get('/paymentoption', authorize, (req, res) => {
  getAllPaymentOptionsController(req, res);
});

router.get('/paymentoption/:id', authorize, (req, res) => {
  getPaymentOptionByIdController(req, res);
});

router.post('/paymentoption', authorize, (req, res) => {
  addNewPaymentOptionController(req, res);
});

router.put('/paymentoption/:id', authorize, (req, res) => {
  editPaymentOptionController(req, res);
});

router.delete('/paymentoption/:id', authorize, (req, res) => {
  deletePaymentOptionController(req, res);
});

// Split routes
router.post('/split', authorize, (req, res) => {
  createNewSplitController(req, res);
});

// Stats routes
router.get('/stats', authorize, (req, res) => {
  getStatsController(req, res);
});

// Friend request routes
router.get('/friendrequest', authorize, (req, res) => {
  getAllFriendRequestsController(req, res);
});

router.post('/friendrequest', authorize, (req, res) => {
  sendNewFriendRequestController(req, res);
});

router.get('/friend', authorize, (req, res) => {
  getAllFriendsController(req, res);
});

router.post('/friend', authorize, (req, res) => {
  acceptFriendRequestController(req, res);
});

router.post('/income', authorize, (req, res) => {
  addNewIncomeController(req, res);
});
// // Friend routes
// router.get('/friend', authorize, (req, res) => {
//   getAllFriendsController(req, res);
// });

router.get('/expenditure', authorize, (req, res) => {
  getStatsController(req, res);
});

router.get('/getcategorysum', authorize, (req, res) => {
  getStatsController(req, res);
});

router.get('/categorysum', authorize, (req, res) => {
  getbyCategory(req, res);
});

router.get('/getincome', authorize, (req, res) => {
  getIncomeController(req, res);
});

router.get('/expensesbymonth', authorize, (req, res) => {
  getExpenseByMonthController(req, res);
});

module.exports = router;
