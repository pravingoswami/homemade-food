const express = require('express')

const userController = require("../app/controllers/userController")

const authenticateUser = require("../app/middlewares/authenticateUser")

const router = express.Router()

router.get("/users/list", userController.listUsers)

router.post("/users/register", userController.register)
router.post("/users/login", userController.login)
router.get("/users/info", authenticateUser ,userController.info)

module.exports = router