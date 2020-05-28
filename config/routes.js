const express = require('express')

const userController = require("../app/controllers/userController")

const router = express.Router()

router.get("/users/list", userController.listUsers)



module.exports = router