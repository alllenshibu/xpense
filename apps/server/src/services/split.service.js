const pool = require('../utils/pg');

const getAllSplitsService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM split WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);
    return result?.rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSplitByExpenseService = async (user, expenseId) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM split WHERE expense_id = $1', [
      expenseId,
    ]);
    return result?.rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createNewSplitService = async (expenseId, split) => {
  try {
    console.log({ expenseId, split });

    let result = await pool.query('SELECT * FROM split WHERE expense_id = $1', [expenseId]);

    if (result?.rows?.length !== 0) {
      throw new Error('Split already exists');
    }

    result = await pool.query('SELECT * FROM expense WHERE id = $1', [expenseId]);

    if (result?.rows?.length === 0) {
      throw new Error('Expense not found');
    }

    let totalPercentage = 0;
    for (let payer of split) {
      totalPercentage += payer.percentage;
      const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [payer.email]);
      if (userId?.rows?.length === 0) {
        throw new Error('User not found');
      }
    }

    if (totalPercentage !== 100) {
      throw new Error('Total percentage must be 100');
    }

    await pool.query('BEGIN');
    for (let payer of split) {
      const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [payer.email]);
      await pool.query('INSERT INTO split (expense_id, user_id, percentage) VALUES ($1, $2, $3)', [
        expenseId,
        userId?.rows[0]?.id,
        payer.percentage,
      ]);
    }
    await pool.query('COMMIT');

    result = await pool.query('SELECT * FROM split WHERE expense_id = $1', [expenseId]);
    return result?.rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllSplitsService,
  createNewSplitService,
  getSplitByExpenseService,
};
