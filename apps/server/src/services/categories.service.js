const { pool } = require('../config/postgres.config.js');

const AddCategory = async (user_id, category) => {
  const c_id = await pool
    .query('SELECT c_id FROM categories WHERE c_user = $1 AND c_name = $2;', [user_id, category])
    .then(async (response) => {
      if (response.rows.length > 0) {
        console.log('Category already exists');
        return;
      }
      const c_idd = await pool
        .query('INSERT INTO categories (c_user, c_name) VALUES ($1, $2) RETURNING c_id;', [user_id, category])
        .then((resp) => {
          console.log('Category added successfully' + resp);
          return resp.rows[0].c_id;
        })
        .catch((err) => {
          console.log('Error: ' + err);
        });

      return c_idd;
    });
  return c_id;
};

const getCategoryId = async (c_user, category) => {
  const category_id = await pool
    .query('SELECT c_id FROM categories WHERE c_user = $1 AND c_name = $2;', [c_user, category])
    .then((response) => {
      if (response.rows.length > 0) {
        return response.rows[0].c_id;
      } else {
        return AddCategory(c_user, category);
      }
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });
  return category_id;
};

module.exports = { AddCategory, getCategoryId };
