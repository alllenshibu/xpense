
const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')

app.use(cors())



const bodyParser = require('body-parser')

app.use(bodyParser.json());

const router = require('./routes');


app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})