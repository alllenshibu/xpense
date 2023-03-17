const { json } = require("express")
const { pool } = require("../config/postgres.config.js")
const {AddCategory, getCategoryId} = require("./categories.service.js")
const {getUserId} = require("./users.service.js")
async function test() {
  const res = await pool.query("SELECT * FROM expenses;")
  console.log(res.rows)
}

const getExpenseDetails = async (user, expenseId) => {
  console.log("User: " + user)
  console.log("Expense ID: " + expenseId)
}

const getAllExpenses = async (user_id) => {


  const res = await pool.query("SELECT * FROM expenses where payer_id = $1 ;",
                              [user_id]
      ).then((response) => {
        return response.rows
      })
    console.log("get all expenses returns" + JSON.stringify(res))
    return res  
  
}

const addNewExpense = async (user, expense) => {
  console.log("User: " + user)
  console.log("Expense: " + JSON.stringify(expense))

  const user_id = await pool.query(
    "SELECT user_id FROM users WHERE username = $1;",
    [user]
  ).then((res) => {
    if(res.rows.length == 0) {         ///to be removed *****************
      const fr_id = pool.query("INSERT INTO users (username) VALUES ($1) RETURNING user_id;", [user]).then((res) => {
        console.log("inserted user " + JSON.stringify(res.rows[0]))
        return res.rows[0].user_id
      }
      )

      return fr_id
    }
      console.log("user id " + res.rows[0].user_id)
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
  const amt = parseFloat(share_amount)

  pool.query(
        "INSERT INTO shares (sh_expid , sh_payerid , fr_id , owe_amount) VALUES ($1, $2, $3, $4) RETURNING sh_expid;",
        [exp_id , payer_id , friend_id , amt]
    ).then((res) => {

        if(payer_id != friend_id)
           pool.query("UPDATE users SET user_owe = user_owe + $1 WHERE user_id = $2;", [share_amount , friend_id])   //derived?
        pool.query("UPDATE users SET user_expense = user_expense + $1 WHERE user_id = $2;", [share_amount , friend_id]) // derived?
        console.log("inserted share " + JSON.stringify(res.rows[0]))
    })
}

const getExpenseByCategories = async (user_id) => {

      const res = await pool.query(
        "SELECT SUM(shares.owe_amount) ,categories.c_name , expenses.c_id FROM shares JOIN categories ON shares.sh_cid = categories.c_id WHERE shares.fr_id = $1 GROUP BY categories.c_name , categories.c_id ;", [user_id]) 
      .then((res) => {
        return res.rows
      } 
      )
      console.log("get expense by category returns" + JSON.stringify(res))
      return res
}


module.exports = { getExpenseDetails, getAllExpenses, getExpenseByCategories, addNewExpense , addShare}
