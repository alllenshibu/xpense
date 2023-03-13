
const {pool} = require("../config/postgres.config.js")

const {Login , Register} = require("../services/Login.services.js")

const LoginController =  async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await Login(username, password)
    if (user) {
        res.send(user)
    }
    else res.send("User not found")
}

const RegisterController = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await Register(username, password)
    if (user) {
        res.send(user)
    }
    else res.send("User already exists or error occured")
}

module.exports = {LoginController , RegisterController}

