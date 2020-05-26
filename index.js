const express = require("express")
const setupDB = require("./config/database")
const router = require("./config/routes")

setupDB()
const app = express()
app.use(express.json())
app.use('/', router)

const port = 3036

app.listen(port, () => {
    console.log('Listening on the port', port)
})
