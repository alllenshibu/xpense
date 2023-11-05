const pool = require('../utils/pg');

const deleteUserService = async (userId) => {
  let result = await pool.query('DELETE FROM "user" WHERE id = $1', [userId]);
  if (result?.rowCount === 0) {
    throw new Error('User does not exist');
  }
  return true;
};

module.exports = {
  deleteUserService,
};
