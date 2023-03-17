const {getAllExpenses} = require("../services/expense.service.js")
const {getAllShares} = require("../services/shares.service.js")
const {getExpenseByCategories} = require("../services/expense.service.js")
const {getUserId} = require("../services/users.service.js")
const {pool} = require("../config/postgres.config.js")
const getAllExpensesController = async (req, res) => {
    const username = req.body.username

    const user = await pool.query("SELECT user_id FROM users WHERE username = $1;", [username]).then((response) => {
        return response.rows[0].user_id
    })


    const expenses = await getAllExpenses(user)
    console.log("Expenses: " + expenses)
    const shares = await getAllShares(user)

    res.status(200).json([...shares , ...expenses])

}

const getExpenseByCategoriesController = async (req, res) => {
    const username = req.body.username
  
    const userId = await getUserId(username)
   
    const result = await getExpenseByCategories(userId)
    res.status(200).json(result)
}


    
module.exports =  {getAllExpensesController , getExpenseByCategoriesController
}
