const { pool } = require("../config/postgres.config.js")

async function test() {
  const res = await pool.query("SELECT * FROM expenses;")
  console.log(res.rows)
}

const getExpenseDetails = async (user, expenseId) => {
  console.log("User: " + user)
  console.log("Expense ID: " + expenseId)
}

const getAllExpenses = async (user) => {
  const res = await pool.query("SELECT * FROM expenses;")
  return res.rows
}

const addNewExpense = async (user, expense) => {
  console.log("User: " + user)
  console.log("Expense: " + JSON.stringify(expense))
}

module.exports = { getExpenseDetails, getAllExpenses, addNewExpense }
