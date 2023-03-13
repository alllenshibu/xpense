
const {pool} = require("../config/postgres.config.js")

const Login = async (username, password) => {

    const user = await pool.query("SELECT * FROM users WHERE username = $1;", [username]).then((response) => {
        if (response.rows.length > 0) {
            return response.rows[0].user_id
        }
        else return NULL;
        }
    
    )
    return user;
    
}

const Register = async (username, password) => {
    const user = await Promise.all(pool.query("SELECT * FROM users WHERE username = $1;", [username]).then(async(response) => {
        if (response.rows.length > 0) {
            return NULL
        }
        else 
        {
            await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;", [username, password]).then((resp) => {
                return resp.rows[0].user_id;
            })
        }
        }
    
    ))
    return user;
    
}

module.exports = {Login , Register}