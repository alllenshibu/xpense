const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Category")
})

router.get("/get", (req, res) => {
  res.send("Get category")
})

router.post("/add", (req, res) => {
  res.send("Add category")

  const user = req.body.user
  const category = req.body.category
})

module.exports = router
