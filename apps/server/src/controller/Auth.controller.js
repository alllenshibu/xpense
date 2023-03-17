
const {pool} = require("../config/postgres.config.js")


const LoginController =  async (req,res,next) => {
    const username = req.body.username
    const password = req.body.password
    const user = await pool.query("SELECT * FROM users WHERE username = $1;", [username]).then((response) => {
        return response.rows[0]
    })
    if (!user) {
        const error = new Error("User does not exist")
        return next(error)
    }

    if (user.password !== password) {
        const error = new Error("Password is incorrect")
        return next(error)
    }

    let token 

    try {
        token = jwt.sign(
            {user_id : user.user_id , username: user.username},
            "What a secret",
            {expiresIn: "1h"}
        )
    } catch (err) {
        const error = new Error("Could not log you in, please try again later")
        return next(error)
    }

    res
    .status(200)
    .json({
        success: true,
        data : {
            user_id : user.user_id,
            username : user.username,
            token : token
        }
    })
}

const RegisterController = async (req, res,next) => {
    const username = req.body.username
    const password = req.body.password
    const user_id = pool.query("SELECT user_id FROM users WHERE username = $1;", [username]).then((response) => {
        return response.rows[0].user_id
    })
    if (user_id) {
        const error = new Error("User already exists")
        return next(error)
    }
    const user = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username , user_id ;", [username, password]).then((response) => {
        return response.rows[0]
    })
    .catch((err) => {
        const error = new Error("Error occured")
        return next(error)
    })


        
    let token

    try{
        token = jwt.sign({username : user.username , user_id : user.user_id },
                "This is a secret",
                {expiresIn : "1h"}
            )
    }

    catch(err){
        const error = new Error("Could not log you in, please try again later")
        return next(error)
    }

    res.status(201).json({
        success : true,
        data : {
            user_id : user.user_id,
            username : user.username,
            token : token
        }
    })

    
}

module.exports = {LoginController , RegisterController}

