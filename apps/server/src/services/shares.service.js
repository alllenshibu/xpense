const {pool}  = require("../config/postgres.config.js");

const getAllShares = async (user_id) =>
{
    const shares = await pool.query("SELECT sh_payerid , sh_expid FROM shares WHERE fr_id = $1;", [user_id]).then((response) => {
            return response.rows;
    })

    .catch((err) => {
             console.log("Error: " + err)
         }
         )
    console.log("Shares: ", shares)
    
        const expenses = await Promise.all(shares.map(async (share) => {
            try {
              const response = await pool.query("SELECT * FROM expenses WHERE exp_id = $1 AND payer_id = $2;", [share.sh_expid, share.sh_payerid]);
              return response.rows;
            } catch (err) {
              console.log("Error: " + err);
              return null; // or some other error handling strategy
            }
          }));
          console.log("Expenses a: ", expenses);
          return expenses;

}

module.exports = {getAllShares}