const express = require("express")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 80

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/expense", require("./routes/expense.route.js"))
app.use("/category", require("./routes/category.route.js"))

app.get("/", (req, res) => {
  res.send("Xpense")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
