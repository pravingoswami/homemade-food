const express = require('express')

const userController = require("../app/controllers/userController")

const authenticateUser = require("../app/middlewares/authenticateUser")
const { authorizeAdmin } = require("../app/middlewares/authorization")

const router = express.Router()


router.post("/users/register", userController.register)
router.post("/users/login", userController.login)
router.get("/users/info", authenticateUser ,userController.info)
router.put("/users/edit" , authenticateUser, userController.edit)
router.delete("/users/logout", authenticateUser, userController.logout)

router.get("/admin/users", authenticateUser, authorizeAdmin, userController.listUsers)
router.get("/admin/users/:id", authenticateUser, authorizeAdmin, userController.userInfo)
router.delete("/admin/users/:id", authenticateUser, authorizeAdmin, userController.removeUser)


module.exports = router