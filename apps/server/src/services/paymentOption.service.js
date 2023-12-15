const { UserDoesNotExistError, PaymentOptionNotFoundError } = require('../utils/errors');
const pool = require('../utils/pg');

const getAllPaymentOptionsService = async ({ user }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM payment_option WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);

    const paymentOptions = result?.rows;

    return paymentOptions;
  } catch (err) {
    throw err;
  }
};

const getPaymentOptionByIdService = async ({ user, paymentOptionId, getExpenses }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    let result = null;

    result = await pool.query('SELECT * FROM payment_option WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      paymentOptionId,
    ]);

    if (!(result?.rows?.length > 0))
      throw new PaymentOptionNotFoundError('Payment option not found');

    const paymentOption = result?.rows[0];

    if (getExpenses) {
      result = await pool.query('SELECT * FROM expense WHERE user_id = $1 AND payment_id = $2', [
        userId?.rows[0]?.id,
        paymentOptionId,
      ]);

      paymentOption.expenses = result?.rows;
    }

    return paymentOption;
  } catch (err) {
    throw err;
  }
};

const addNewPaymentOptionService = async ({ user, name }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'INSERT INTO payment_option (user_id, name) VALUES ($1, $2) RETURNING *',
      [userId?.rows[0]?.id, name],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Payment option not added');

    const paymentOption = result?.rows[0];
    return paymentOption;
  } catch (err) {
    throw err;
  }
};

const editPaymentOptionService = async ({ user, id, name }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'UPDATE payment_option SET name = $1 WHERE user_id = $2 AND id = $3 RETURNING *',
      [name, userId?.rows[0]?.id, id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Payment option not edited');

    const paymentOption = result?.rows[0];

    return paymentOption;
  } catch (err) {
    throw err;
  }
};

const deletePaymentOptionService = async ({ user, id }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('DELETE FROM payment_option WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      id,
    ]);

    if (!(result?.rowCount > 0)) throw new PaymentOptionNotFoundError('Payment option not found');

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllPaymentOptionsService,
  getPaymentOptionByIdService,
  addNewPaymentOptionService,
  editPaymentOptionService,
  deletePaymentOptionService,
};
