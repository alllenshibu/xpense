const { UserDoesNotExistError, CategoryNotFoundError } = require('../utils/errors');
const pool = require('../utils/pg');

const getAllCategoriesService = async ({ user }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM category WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);

    const categories = result?.rows;

    return categories;
  } catch (err) {
    throw err;
  }
};

const getCategoryByIdService = async ({ user, categoryId }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    let result = null;

    result = await pool.query('SELECT * FROM category WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      categoryId,
    ]);

    if (!(result?.rows?.length > 0)) throw new CategoryNotFoundError('Category not found');

    const category = result?.rows[0];

    result = await pool.query('SELECT * FROM expense WHERE user_id = $1 AND category_id = $2', [
      userId?.rows[0]?.id,
      categoryId,
    ]);

    category.expenses = result?.rows;

    return category;
  } catch (err) {
    throw err;
  }
};

const addNewCategoryService = async ({ user, name }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'INSERT INTO category (user_id, name) VALUES ($1, $2) RETURNING *',
      [userId?.rows[0]?.id, name],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Category not added');

    const category = result?.rows[0];
    return category;
  } catch (err) {
    throw err;
  }
};

const editCategoryService = async ({ user, id, name }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      'UPDATE category SET name = $1 WHERE user_id = $2 AND id = $3 RETURNING *',
      [name, userId?.rows[0]?.id, id],
    );

    if (!(result?.rows?.length > 0)) throw new Error('Category not edited');

    const category = result?.rows[0];

    return category;
  } catch (err) {
    throw err;
  }
};

const deleteCategoryService = async ({ user, categoryId }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('DELETE FROM category WHERE user_id = $1 AND id = $2', [
      userId?.rows[0]?.id,
      categoryId,
    ]);

    if (!(result?.rowCount > 0)) throw new CategoryNotFoundError('Category not found');

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllCategoriesService,
  getCategoryByIdService,
  addNewCategoryService,
  editCategoryService,
  deleteCategoryService,
};
