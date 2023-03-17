const {pool} = require("../config/postgres.config.js")

const getUserId = async (username) =>
{
    return await pool.query("SELECT user_id FROM users WHERE username = $1;", [username]).then((response) => {
        console.log("User ID: " + response.rows[0].user_id)
        return response.rows[0].user_id
    })
}

module.exports = {getUserId}