const {
  getAllExpensesService,
  addNewExpenseService,
  getExpenseByIdService,
  getExpenseByMonth,
  editExpenseService,
  deleteExpenseService,
  addIncomeService,
} = require('../services/expense.service');
const { UserDoesNotExistError, ExpenseNotFoundError } = require('../utils/errors');

const getAllExpensesController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const expenses = await getAllExpensesService(user);

    if (!expenses) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ expenses: expenses });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getExpenseByIdController = async (req, res) => {
  const user = req?.user;
  const expenseId = req?.params?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!expenseId || expenseId === '' || expenseId === undefined) {
    return res.status(400).json({ message: 'Expense ID is missing' });
  }

  try {
    const expense = await getExpenseByIdService(user, expenseId);

    if (!expense) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ expense: expense });
  } catch (err) {
    if (err instanceof ExpenseNotFoundError) return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getExpenseByMonthController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'User not defined Something went wrong' });
  }

  try {
    const expenses = await getExpenseByMonth(user);
    console.log(expenses);

    if (!expenses) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ expenses: expenses });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
const addNewExpenseController = async (req, res) => {
  const user = req?.user;
  const title = req?.body?.expense?.title;
  const amount = req?.body?.expense?.amount;
  const categoryId = req?.body?.expense?.categoryId;
  // const paymentOptionId = req?.body?.expense?.paymentOptionId;
  const timestamp = req?.body?.expense?.timestamp;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!title || title === '' || title === undefined) {
    return res.status(400).json({ message: 'Title is missing' });
  }
  if (!amount || amount === '' || amount === undefined) {
    return res.status(400).json({ message: 'Amount is missing' });
  }

  if (!timestamp || timestamp === '' || timestamp === undefined) {
    return res.status(400).json({ message: 'Timestamp is missing' });
  }

  try {
    const expense = await addNewExpenseService(
      user,
      title,
      amount,
      categoryId,
      // paymentOptionId,
      timestamp,
    );

    if (!expense) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ expense: expense });
  } catch (err) {
    console.log(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const editExpenseController = async (req, res) => {
  const user = req?.user;
  const id = req?.body?.expense?.id;
  const title = req?.body?.expense?.title;
  const amount = req?.body?.expense?.amount;
  const categoryId = req?.body?.expense?.categoryId;
  const paymentOptionId = req?.body?.expense?.paymentOptionId;
  const timestamp = req?.body?.expense?.timestamp;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!id || id === '' || id === undefined) {
    return res.status(400).json({ message: 'Expense ID is missing' });
  }

  if (!title || title === '' || title === undefined) {
    return res.status(400).json({ message: 'Title is missing' });
  }
  if (!amount || amount === '' || amount === undefined) {
    return res.status(400).json({ message: 'Amount is missing' });
  }

  if (!timestamp || timestamp === '' || timestamp === undefined) {
    return res.status(400).json({ message: 'Timestamp is missing' });
  }

  try {
    const expense = await editExpenseService(
      user,
      id,
      title,
      amount,
      categoryId,
      paymentOptionId,
      timestamp,
    );

    if (!expense) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ expense: expense });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const deleteExpenseController = async (req, res) => {
  const user = req?.user;
  const expenseId = req?.body?.expense?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!expenseId || expenseId === '' || expenseId === undefined) {
    return res.status(400).json({ message: 'Expense ID is missing' });
  }

  try {
    const deleted = await deleteExpenseService(user, expenseId);

    if (!deleted) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ message: 'Successfully deleted expense' });
  } catch (err) {
    if (err instanceof ExpenseNotFoundError) return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAllExpensesController,
  getExpenseByIdController,
  addNewExpenseController,
  editExpenseController,
  deleteExpenseController,
  getExpenseByMonthController,
};
