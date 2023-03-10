const { pool } = require("../config/postgres.config.js")
const {AddCategory, getCategoryId} = require("./categories.service.js")
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

  const user_id = await pool.query(
    "SELECT id FROM users WHERE username = $1;",
    [user]
  ).then((res) => {
    return res.rows[0].id
  })


  const categ_id = getCategoryId( user_id , expense.category)
  console.log("Category ID: " + categ_id)
  const exp_id = pool.query(
    "INSERT INTO expenses (payer_id, category_id, amount, description, date) VALUES ($1, $2, $3, $4, $5);",
    [user_id, categ_id, expense.amount, expense.name, expense.date ]
  ).then((res) => {
      return res.rows[0].exp_id;
  })
    expense.group.map((share)=>{

        const friend_id = pool.query(
            "SELECT id FROM users WHERE username = $1;",
            [share.username]
        ).then((res) => {
            return res.rows[0].id
        }
        )
        addShare(exp_id , user_id , friend_id , share.amount)
    })
}

const addShare = (exp_id , payer_id , friend_id , share_amount) => {

  pool.query(
        "INSERT INTO shares (sh_expid , sh_payerid , fr_id , owe_amount) VALUES ($1, $2, $3, $4);",
        [exp_id , payer_id , friend_id , share_amount]
    ).then((res) => {
        console.log("inserted share " + JSON.stringify(res.rows[0]))
    })
}


module.exports = { getExpenseDetails, getAllExpenses, addNewExpense , addShare}
