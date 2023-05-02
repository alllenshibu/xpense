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
  let exp_id;
  try
  {
  const user_id = await getUserId(user);
  console.log('user id is ' + user_id);

  await pool.query('BEGIN');
  const res = await pool
    .query('INSERT INTO expenses (payer_id, amount, name, date) VALUES ($1, $2, $3, $4) RETURNING exp_id;', [
      user_id,
      expense.amount,
      expense.name,
      expense.date,
    ]);
   exp_id = res.rows[0].exp_id;
  
   
   await pool.query('BEGIN');
   expense.group.map(async (share) => {
      const friend_id = await getUserId(share.username);
      const categ_id = await getCategoryId(friend_id, share.category);
      await addShare(exp_id, user_id, friend_id, categ_id, share.amount);
      
    });
    await pool.query('COMMIT');
    return true;
  }
   catch (err) {
    await pool.query('ROLLBACK');
    console.log(err);    
    return false;
  }
};
const EditExpense = async (user, expense) => {
try{    
  const user_id = await getUserId(user);
  await pool.query("BEGIN");
  await pool.query("UPDATE expenses SET amount = $1, name = $2, date = $3 WHERE exp_id = $4;", [ expense.amount, expense.name, expense.date, expense.exp_id]);
  await pool.query("DELETE FROM shares WHERE sh_expid = $1;", [expense.exp_id]);
  expense.group.map(async (share) => {
    const friend_id = await getUserId(share.username);
    const categ_id = await getCategoryId(friend_id, share.category);
    await addShare(exp_id, user_id, friend_id, categ_id, share.amount);
    
  });
  await pool.query("COMMIT");
}  
catch(err){

await pool.query("ROLLBACK");
console.log(err);
return false;
};
}

const addShare = async(exp_id, payer_id, friend_id, categ_id, share_amount) => {
  try{
  
  let paid = false;
  if (friend_id == payer_id) {
    paid = true;
  }
  const amt = parseFloat(share_amount);

  await pool
    .query(
      'INSERT INTO shares (sh_expid , sh_payerid , fr_id , owe_amount , paid, sh_cid) VALUES ($1, $2, $3, $4 , $5,$6) RETURNING sh_expid;',
      [exp_id, payer_id, friend_id, amt, paid, categ_id]
    );
      if (payer_id != friend_id)
        await pool.query('BEGIN');
        const success = await pool.query('UPDATE friends SET f_owe = f_owe - $1 WHERE frnd_sender = $2 AND frnd_reciever = $3 RETURNING *;', [share_amount, payer_id, friend_id]);
        if (success.rowCount == 0) {
          await pool.query('UPDATE friends SET f_owe = f_owe + $1 WHERE frnd_sender = $2 AND frnd_reciever = $3 RETURNING *;', [share_amount, friend_id, payer_id]);
        }
        await pool.query('UPDATE users SET user_owe = user_owe + $1 WHERE user_id = $2;', [share_amount, friend_id]); //derived?
        await pool.query('UPDATE users SET user_expense = user_expense + $1 WHERE user_id = $2;', [share_amount, friend_id]); // derived?
        await pool.query('COMMIT');
        console.log('inserted share ');}
        catch(err){
          console.log(err);
          await pool.query('ROLLBACK');
          return false;
        }
      
      

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

const getExpensesOnDate = async (user_id, date) => {
  const res = await pool.query('SELECT * FROM shares JOIN expenses ON shares.sh_expid = expenses.exp_id JOIN categories ON shares.sh_cid = categories.c_id WHERE shares.fr_id = $1 AND expenses.date = $2;', [user_id, date]).then((res) => {
    return res.rows;
  });
  console.log('get expenses on date returns' + JSON.stringify(res));
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

const getCommonExpenses = async (username, friendName) => {

try
  {  const user_id = await getUserId(username);
  const friend_id = await getUserId(friendName);
  const res = await pool
    .query(
      'SELECT * FROM (shares JOIN expenses ON shares.sh_expid = expenses.exp_id) JOIN categories ON shares.sh_cid = categories.c_id WHERE (shares.fr_id = $1 AND shares.sh_payerid = $2) OR (shares.fr_id = $2 AND shares.sh_payerid = $1);',
      [user_id, friend_id]
    );
  console.log('get common expenses returns' + JSON.stringify(res.rows));
  return res.rows;
} 
catch(err){
  console.log(err);
  return false;

};
};

module.exports = {
  getExpenseDetails,
  getAllExpenses,
  getExpenseByCategories,
  addNewExpense,
  addShare,
  getCategoryExpenses,
  getExpensesOnDate,
  EditExpense,
  getCommonExpenses,
};
