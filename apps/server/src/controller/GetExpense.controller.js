const {getAllExpenses} = require("../services/expense.service.js")
const {getAllShares} = require("../services/shares.service.js")

const getAllExpensesController = async (req, res) => {
    const user = req.body.user_id
    const expenses = await getAllExpenses(user)
    console.log("Expenses: " + expenses)
    const shares = await getAllShares(user)

    res.send([...shares , ...expenses])
    }
    
module.exports =  {getAllExpensesController}
