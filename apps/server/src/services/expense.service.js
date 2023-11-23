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

const getExpenseByMonth = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'SELECT extract(month from timestamp) as month,sum(amount) FROM expense WHERE user_id = $1  group by extract(month from timestamp) order by  extract(month from timestamp)',
      [userId?.rows[0]?.id],
    );
    const incomeresult = await pool.query(
      'SELECT extract(month from timestamp) as month,sum(amount) FROM income WHERE user_id = $1  group by extract(month from timestamp) order by  extract(month from timestamp)',
      [userId?.rows[0]?.id],
    );
    if (!(result?.rows?.length > 0)) throw new ExpenseNotFoundError('Expense not found');
    if (!(incomeresult?.rows?.length > 0)) throw new ExpenseNotFoundError('Expense not found');

    const expense = result?.rows;
    const income = incomeresult?.rows;
    console.log(income);

    return {expense,income};
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

module.exports = {
  getAllExpensesService,
  getExpenseByIdService,
  addNewExpenseService,
  editExpenseService,
  deleteExpenseService,
  getExpenseByMonth,
};
