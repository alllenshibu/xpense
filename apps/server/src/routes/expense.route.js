const express = require("express")

const router = express.Router()
const {addExpenseController} = require("../controller/AddExpense.controller.js")
const {getExpenseDetailsController} = require("../controller/GetExpense.controller.js")
const {getAllExpensesController} = require("../controller/GetExpense.controller.js")

router.get("/", (req, res) => {
  res.send("Expense")
})

router.get("/get", (req, res) => {
  const expenseId = req.query.expenseId
  const user = req.query.user

  getExpenseDetails(user, expenseId)

  res.send("Get expense")
})

router.get("/getall", getAllExpensesController)

router.get("/analysis", (req, res) => {
  res.send("Get expense analysis like insights, trends, etc.")
})

router.post("/add", addExpenseController)

module.exports = router
