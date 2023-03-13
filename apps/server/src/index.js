const express = require("express")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const { pool } = require("./config/postgres.config.js")

const app = express()
const port = process.env.PORT || 3002

if(pool) {
  console.log("Connected to Postgres")
} else {
  console.log("Error connecting to Postgres")
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/expense", require("./routes/expense.route.js"))
app.use("/category", require("./routes/category.route.js"))
app.use("/",require("./routes/auth.route.js"))

app.get("/", (req, res) => {
  res.send("Xpense")
})

app.post("/adduser", (req, res) => {
  const username = req.body.username
  res.send("Add user " + username)
  pool.query("INSERT INTO users (username) VALUES ($1);", [username]).then((res) => {
    console.log("User added successfully" + res)
  }
  )
  .catch((err) => {
    console.log("Error: " + err)
  } 

)

})


  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
