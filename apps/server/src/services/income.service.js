const { UserDoesNotExistError } = require('../utils/errors');
const pool = require('../utils/pg');

const addNewIncomeService = async (user, amount) => {
  try {
    console.log(amount);
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'INSERT INTO income (amount , user_id) VALUES ($1, $2) RETURNING *',
      [amount, userId?.rows[0]?.id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('income not added');

    const income = result?.rows[0];
    return income;
  } catch (err) {
    throw err;
  }
};

const getIncomeservice = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }
    const result = await pool.query('SELECT sum(amount) FROM income WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);

    if (!(result?.rows?.length > 0)) throw new Error('income not added');

    const income = result?.rows[0];
    return income;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNewIncomeService,
  getIncomeservice,
};
