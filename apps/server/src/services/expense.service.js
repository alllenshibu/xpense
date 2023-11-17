const { UserDoesNotExistError, ExpenseNotFoundError } = require('../utils/errors');
const pool = require('../utils/pg');

const getAllExpensesService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM expense WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);

    const expenses = result?.rows;

    return expenses;
  } catch (err) {
    throw err;
  }
};

const getExpenseByIdService = async (user, expenseId) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM expense WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      expenseId,
    ]);

    if (!(result?.rows?.length > 0)) throw new ExpenseNotFoundError('Expense not found');

    const expense = result?.rows[0];

    return expense;
  } catch (err) {
    throw err;
  }
};

const addNewExpenseService = async (
  user,
  title,
  amount,
  categoryId,
  // paymentOptionId,
  timestamp,
) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    console.log({ title, amount, categoryId, timestamp, userId: userId?.rows[0]?.id });

    const result = await pool.query(
      'INSERT INTO expense (title, amount, category_id, timestamp, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, amount, categoryId, timestamp, userId?.rows[0]?.id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Expense not added');

    const expense = result?.rows[0];
    return expense;
  } catch (err) {
    throw err;
  }
};

const editExpenseService = async (
  user,
  id,
  title,
  amount,
  categoryId,
  paymentOptionId,
  timestamp,
) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'UPDATE expense SET title = $1, amount = $2, category_id = $3, payment_id = $4 timestamp = $5 WHERE user_id = $6 AND id = $7 RETURNING *',
      [title, amount, categoryId, paymentOptionId, timestamp, userId?.rows[0]?.id, id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Expense not edited');

    const expense = result?.rows[0];

    return expense;
  } catch (err) {
    throw err;
  }
};

const deleteExpenseService = async (user, expenseId) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('DELETE FROM expense WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      expenseId,
    ]);

    if (!(result?.rowCount > 0)) throw new ExpenseNotFoundError('Expense not found');

    return true;
  } catch (err) {
    throw err;
  }
};

const addIncomeService = async (user, income) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }
    const result = await pool.query(
      'INSERT INTO income (income , user_id) VALUES ($1, $2) RETURNING *',
      [income, userId?.rows[0]?.id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('income not added');

    const income = result?.rows[0];
    return income;
  } catch (error) {}
};
const getIncomeservice = async (user, timestamp) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }
    const result = await pool.query(
      'SELECT sum(income) FROM income WHERE user_id = $1 and timestamp = $2',
      [userId?.rows[0]?.id, timestamp],
    );

    if (!(result?.rows?.length > 0)) throw new Error('income not added');

    const income = result?.rows[0];
    return income;
  } catch (error) {}
};

module.exports = {
  getAllExpensesService,
  getExpenseByIdService,
  addNewExpenseService,
  editExpenseService,
  deleteExpenseService,
  addIncomeService,
  getIncomeservice,
};
