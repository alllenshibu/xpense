const { UserDoesNotExistError, IncomeNotFoundError } = require('../utils/errors');
const pool = require('../utils/pg');

const getAllIncomesService = async (user, limit = 20) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'SELECT * FROM income WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2',
      [userId?.rows[0]?.id, limit],
    );

    const incomes = result?.rows;

    return incomes;
  } catch (err) {
    throw err;
  }
};

const getIncomeByIdService = async (user, incomeId) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM income WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      incomeId,
    ]);

    if (!(result?.rows?.length > 0)) throw new IncomeNotFoundError('Income not found');

    let income = result?.rows[0];

    return income;
  } catch (err) {
    throw err;
  }
};

const addNewIncomeService = async (user, title, amount, timestamp) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'INSERT INTO income (title, amount, timestamp, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, amount, timestamp, userId?.rows[0]?.id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Income not added');

    const income = result?.rows[0];
    return income;
  } catch (err) {
    throw err;
  }
};

const editIncomeService = async (user, id, title, amount, timestamp) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'UPDATE income SET title = $1, amount = $2, timestamp = $3 WHERE user_id = $4 AND id = $5 RETURNING *',
      [title, amount, timestamp, userId?.rows[0]?.id, id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Income not edited');

    const income = result?.rows[0];

    return income;
  } catch (err) {
    throw err;
  }
};

const deleteIncomeService = async (user, incomeId) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('DELETE FROM income WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      incomeId,
    ]);

    if (!(result?.rowCount > 0)) throw new IncomeNotFoundError('Income not found');

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllIncomesService,
  getIncomeByIdService,
  addNewIncomeService,
  editIncomeService,
  deleteIncomeService,
};
