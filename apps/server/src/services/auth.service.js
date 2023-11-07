const pool = require('../utils/pg');

const signupService = async (email, password, firstName, lastName) => {
  let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);

  if (user?.rows?.length > 0) {
    throw new Error('User already exists');
  }

  console.log('Creating user');
  const result = await pool.query(
    'INSERT INTO "user" (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, password, firstName, lastName],
  );

  if (result?.rows?.length > 0) {
    return result?.rows[0]?.id;
  } else {
    throw new Error('Something went wrong');
  }
};

const loginService = async (email, password) => {
  let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
  if (user?.rows?.length === 0) {
    throw new Error('User does not exist');
  }

  if (user?.rows?.length > 0 && user.rows[0].password !== password) {
    throw new Error('Wrong password');
  }

  return user?.rows[0]?.id;
};

module.exports = {
  signupService,
  loginService,
};
