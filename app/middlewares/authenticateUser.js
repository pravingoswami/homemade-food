const UserModel = require("../models/UserModel")

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    UserModel.findByToken(token)
        .then(user => {
            if(user){
                req.user = user,
                req.token = token
                next()
            } else {
                res.status('401').send({
                    notice : "Token not available"
                })
            }
        })
        .catch (err => res.status("401").send(err))
}

module.exports = authenticateUser