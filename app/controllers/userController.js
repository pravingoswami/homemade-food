const UserModel = require("../models/UserModel")
const lodash = require('lodash')


module.exports.listUsers = (req, res) => {
    UserModel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.register = (req, res) => {
    const user = new UserModel(lodash.pick(req.body, ["_id", "name", "username", "email", "mobile", "password", "gender", "avatar", "role"]))
    user.ips.register.push(req.id)
    user.save()
        .then(user => res.json(lodash.pick(user, ["_id", "name", "mobile", "username", "email", "gender", "avatar", "role"])))
        .catch(err => res.json(err))
}

module.exports.login = (req, res) => {
    let user
    UserModel.findByCredentials(req.body.username, req.body.password)
        .then(userdata => {
            user = lodash.pick(userdata , ["_id", "name", "mobile", "username", "email", "gender", "avatar", "role"])
            return userdata.generateToken(req.ip)
        })
            .then(token => res.json({user, token}))
            
        .catch(err => res.json(err))
}

module.exports.info = (req, res) => {
    res.json(lodash.pick(req.user , ["_id", "name", "mobile", "username", "email", "gender", "avatar", "role"]))
}

module.exports.edit = (req, res) => {
    const body = lodash.pick(req.body, ["_id", "name", "mobile", "username", "email", "gender", "avatar", "role"])
    UserModel.findByIdAndUpdate(req.user._id, body, {new : true, runValidators : true})
        .then(user => user ? res.json(lodash.pick(req.user , ["_id", "name", "mobile", "username", "email", "gender", "avatar", "role"])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    UserModel.findByIdAndUpdate(req.user._id, {$pull : {tokens : {token : req.token}}})
        .then(user => user ? res.json(lodash.pick(req.user , ["_id", "name", "mobile", "username", "email", "gender", "avatar", "role"])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.userInfo = (req, res) => {
    UserModel.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.removeUser = (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))
}