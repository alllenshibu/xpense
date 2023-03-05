const express = require("express")
const router = express.Router()

const {
  getExpenseDetails,
  getAllExpenses,
  addNewExpense,
} = require("../services/expense.service.js")

router.get("/", (req, res) => {
  res.send("Expense")
})

router.get("/get", (req, res) => {
  const expenseId = req.query.expenseId
  const user = req.query.user

  getExpenseDetails(user, expenseId)

  res.send("Get expense")
})

router.get("/getall", async (req, res) => { 
  const user = req.query.user

  const expenses = await getAllExpenses(user)

  res.send(expenses)
})

router.get("/analysis", (req, res) => {
  res.send("Get expense analysis like insights, trends, etc.")
})

router.post("/add", (req, res) => {
  res.send("Add expense")

  const user = req.body.user
  const expense = req.body.expense

  addNewExpense(user, expense)
})

module.exports = router
