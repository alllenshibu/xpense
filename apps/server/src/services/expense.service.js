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
    "SELECT user_id FROM users WHERE username = $1;",
    [user]
  ).then((res) => {
    if(res.rows.length == 0) {         ///to be removed *****************
      const fr_id = pool.query("INSERT INTO users (username) VALUES ($1);", [user]).then((res) => {

        console.log("inserted user " + JSON.stringify(res.rows[0]))
        return res.rows[0].user_id
      }
      )

      return fr_id
    }
      console.log("user id " + JSON.stringify(res.rows[0]))
      return res.rows[0].user_id
  })

//
  const categ_id = await getCategoryId( user_id , expense.category)
  console.log("Category ID: " + categ_id)
  const exp_id = await pool.query(
    "INSERT INTO expenses (payer_id, exp_cid, amount, name, date) VALUES ($1, $2, $3, $4, $5) RETURNING exp_id;",
    [user_id, categ_id, expense.amount, expense.name, expense.date ]
  ).then((resp) => {
      if(resp.rows.length == 0) {         ///to be removed *****************
        console.log("Error: Nothing insertedd")
        }
      return resp.rows[0].exp_id;
  })


    expense.group.map(async (share)=>{

        const friend_id = await pool.query(
            "SELECT user_id FROM users WHERE username = $1;",
            [share.username]
        ).then((res) => {
            if(res.rows.length == 0) {         ///to be removed *****************
                pool.query("INSERT INTO users (username) VALUES ($1) RETURNING user_id;", [share.username]).then((res) => {
                         console.log("inserted user " + JSON.stringify(res.rows[0]))
                         return res.rows[0].user_id
                }
                )
            }
  

            return res.rows[0].user_id
        }
        )
        console.log("about to add the details : " + exp_id + " " + user_id + " " + friend_id + " " + share.amount)
        addShare(exp_id , user_id , friend_id , share.amount)
    })
}

const addShare = (exp_id , payer_id , friend_id , share_amount) => {

  pool.query(
        "INSERT INTO shares (sh_expid , sh_payerid , fr_id , owe_amount) VALUES ($1, $2, $3, $4) RETURNING sh_expid;",
        [exp_id , payer_id , friend_id , share_amount]
    ).then((res) => {
        console.log("inserted share " + JSON.stringify(res.rows[0]))
    })
}


module.exports = { getExpenseDetails, getAllExpenses, addNewExpense , addShare}
