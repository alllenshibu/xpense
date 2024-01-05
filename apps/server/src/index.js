const express = require("express");
var cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const router = require("./routes");

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
