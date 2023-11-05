const pool = require('../utils/pg');

const findUserByEmailService = async (email) => {
  let user = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
  if (user?.rows?.length === 0) {
    throw new Error('User does not exist');
  }
  return user?.rows[0]?.id;
};

const deleteUserService = async (userId) => {
  let result = await pool.query('DELETE FROM "user" WHERE id = $1', [userId]);
  if (result?.rowCount === 0) {
    throw new Error('User does not exist');
  }
  return true;
};

module.exports = {
  findUserByEmailService,
  deleteUserService,
};
