
const {addNewExpense} = require("../services/expense.service.js");

const AddExpenseController = async (req, res) => {
    const username = req.body.username;
    const expense = req.body.expense;
    addNewExpense(username, expense);
    }

module.exports = AddExpenseController;