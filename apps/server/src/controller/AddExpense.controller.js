
const {addNewExpense} = require("../services/expense.service.js");

const addExpenseController = async (req, res) => {
    const username = req.body.user;
    const expense = req.body.expense;
    addNewExpense(username, expense);
    }

module.exports = {addExpenseController};