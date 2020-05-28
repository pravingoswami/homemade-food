const UserModel = require("../models/UserModel")

module.exports.listUsers = (req, res) => {
    UserModel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.register = (req, res) => {
    console.log(req.body)
    const user = new UserModel(req.body)
    user.save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}