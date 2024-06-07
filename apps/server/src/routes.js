import express from 'express';

import { authorize } from './middlewares/authorize.js';

import { signupController, loginController } from './controllers/auth.js';
import {
  addPaymentOption,
  getPaymentOptionById,
  getPaymentOptions,
} from './controllers/paymentOption.js';

import { addCategory, getCategoryById, getCategories } from './controllers/category.js';

import { addExpense, getExpenseById, getExpenses } from './controllers/expense.js';
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequestsReceived,
  getFriendRequestsSent,
  getAllFriends,
} from './controllers/friendship.js';

const router = express.Router();

// Auth routes
router.post('/auth/signup', signupController);
router.post('/auth/login', loginController);

router.post('/payment-options', authorize, addPaymentOption);
router.get('/payment-options', authorize, getPaymentOptions);
router.get('/payment-options/:id', authorize, getPaymentOptionById);

router.post('/categoreis', authorize, addCategory);
router.get('/categories', authorize, getCategories);
router.get('/categories/:id', authorize, getCategoryById);

router.post('/expenses', authorize, addExpense);
router.get('/expenses', authorize, getExpenses);
router.get('/expenses/:id', authorize, getExpenseById);

router.post('/friend-requests/send', authorize, sendFriendRequest);
router.post('/friend-requests/accept', authorize, acceptFriendRequest);
router.get('/friend-requests/received', authorize, getFriendRequestsReceived);
router.get('/friend-requests/sent', authorize, getFriendRequestsSent);

router.get('/friends', authorize, getAllFriends);

export default router;
