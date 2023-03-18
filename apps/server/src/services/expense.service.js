const { json } = require('express');
const { pool } = require('../config/postgres.config.js');
const { AddCategory, getCategoryId } = require('./categories.service.js');
const { getUserId, isFriend } = require('./users.service.js');

const getExpenseDetails = async (user, expenseId) => {
  console.log('User: ' + user);
  console.log('Expense ID: ' + expenseId);
};

const getAllExpenses = async (user_id) => {
  const res = await pool.query('SELECT * FROM shares JOIN expenses ON shares.sh_expid = expenses.exp_id JOIN categories ON shares.sh_cid = categories.c_id WHERE shares.fr_id = $1 ;', [user_id]).then((response) => {
    return response.rows;
  });
  console.log('get all expenses returns' + JSON.stringify(res));
  return res;
};

const addNewExpense = async (user, expense) => {
  const user_id = await getUserId(user);
  console.log('Category ID: ' + categ_id);
  const exp_id = await pool
    .query('INSERT INTO expenses (payer_id, amount, name, date) VALUES ($1, $2, $3, $4, $5) RETURNING exp_id;', [
      user_id,
      expense.amount,
      expense.name,
      expense.date,
    ])
    .then((resp) => {
      if (resp.rows.length == 0) {
        ///to be removed *****************
        console.log('Error: Nothing insertedd');
      }

      return resp.rows[0].exp_id;
    });

  try {
    expense.group.map(async (share) => {
      const friend_id = await getUserId(share.username);
      const categ_id = await getCategoryId(share.user, share.category);
      addShare(exp_id, user_id, friend_id, categ_id, share.amount);
    });
  } catch (err) {
    console.log(err);

    return false;
  }
  return true;
};

const addShare = (exp_id, payer_id, friend_id, categ_id, share_amount) => {
  let paid = false;
  if (friend_id == payer_id) {
    paid = true;
  }
  const amt = parseFloat(share_amount);

  pool
    .query(
      'INSERT INTO shares (sh_expid , sh_payerid , fr_id , owe_amount , paid, sh_cid) VALUES ($1, $2, $3, $4 , $5,$6) RETURNING sh_expid;',
      [exp_id, payer_id, friend_id, amt, paid, categ_id]
    )
    .then((res) => {
      if (payer_id != friend_id)
        pool.query('UPDATE users SET user_owe = user_owe + $1 WHERE user_id = $2;', [share_amount, friend_id]); //derived?
      pool.query('UPDATE users SET user_expense = user_expense + $1 WHERE user_id = $2;', [share_amount, friend_id]); // derived?
      console.log('inserted share ' + JSON.stringify(res.rows[0]));
    });
};

const getExpenseByCategories = async (user_id) => {
  const res = await pool
    .query(
      'SELECT SUM(shares.owe_amount), categories.c_name FROM shares JOIN categories ON shares.sh_cid = categories.c_id WHERE shares.fr_id = $1 GROUP BY categories.c_name;',
      [user_id]
    )
    .then((res) => {
      return res.rows;
    });
  console.log('get expense by category returns' + JSON.stringify(res));
  return res;
};

const getCategoryExpenses = async (user_id, category_id) => {
  const res = await pool
    .query(
      'SELECT * FROM shares JOIN expenses ON shares.sh_expid = expenses.exp_id JOIN categories ON shares.sh_cid = categories.c_id WHERE shares.fr_id = $1 AND shares.sh_cid = $2;',
      [user_id, category_id]
    )
    .then((res) => {
      return res.rows;
    });
  console.log('get category expenses returns' + JSON.stringify(res));
  return res;
};

module.exports = {
  getExpenseDetails,
  getAllExpenses,
  getExpenseByCategories,
  addNewExpense,
  addShare,
  getCategoryExpenses,
};
