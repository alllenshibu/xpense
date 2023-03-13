
const express = require("express")
const router = express.Router()
const {LoginController , RegisterController} = require("../controller/auth.controller.js")


router.post("/login", LoginController)

router.post("/register", RegisterController)

module.exports = router