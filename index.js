const express = require("express")
const setupDB = require("./config/database")
const router = require("./config/routes")
require('dotenv').config()
const path = require('path')
const publicDir = path.join(__dirname, './public')
const cors = require("cors")

const port = process.env.PORT || 3036

setupDB()
const app = express()
app.use(cors())
app.use(express.static(publicDir))
app.use(express.json())


app.use('/', router)



app.listen(port, () => {
    console.log('Listening on the port', port)
})

