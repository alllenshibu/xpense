const pool = require('../utils/pg');

const {
  UserAlreadyExistsError,
  UserDoesNotExistError,
  WrongPasswordError,
} = require('../utils/errors');

const signupService = async (email, password, firstName, lastName) => {
  try {
    let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);

    if (user?.rows?.length > 0) {
      throw new UserAlreadyExistsError('User already exists');
    }

    const result = await pool.query(
      'INSERT INTO "user" (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, password, firstName, lastName],
    );

    if (!(result?.rows?.length > 0)) {
      throw new Error('More than one user exists with the same credentials');
    }

    user = result.rows[0];

    return user?.id;
  } catch (err) {
    throw err;
  }
};

const loginService = async (email, password) => {
  try {
    let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
    if (user?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    if (user?.rows?.length > 0 && user.rows[0].password !== password) {
      throw new WrongPasswordError('Wrong password');
    }

    return user?.rows[0]?.id;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  signupService,
  loginService,
};
