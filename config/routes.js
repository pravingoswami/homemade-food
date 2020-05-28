const express = require('express')

const userController = require("../app/controllers/userController")

const router = express.Router()

router.get("/users/list", userController.listUsers)

router.post("/users/register", userController.register)
router.post("/users/login", userController.login)

module.exports = router