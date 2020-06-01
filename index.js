const express = require("express")
const setupDB = require("./config/database")
const router = require("./config/routes")
require('dotenv').config()
const path = require('path')

const port = process.env.PORT || 3036

setupDB()
const app = express()
app.use(express.json())
// app.get("/", (req,res) => {
//     res.json("welcome to our page")
// })

app.use('/', router)



app.listen(port, () => {
    console.log('Listening on the port', port)
})

