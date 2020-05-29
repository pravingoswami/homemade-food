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

module.exports.login = (req, res) => {
    console.log(req.body)
    let user
    UserModel.findByCredentials(req.body.username, req.body.password)
        .then(userdata => {
            user = userdata
            return userdata.generateToken(req.ip)
        })
            .then(token => res.json({user, token}))
            
        .catch(err => res.json(err))
}

module.exports.info = (req, res) => {
    res.json(req.user)
}

module.exports.edit = (req, res) => {
    const body = req.body
    UserModel.findByIdAndUpdate(req.user._id, body, {new : true, runValidators : true})
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    UserModel.findByIdAndUpdate(req.user._id, {$pull : {tokens : {token : req.token}}})
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))
}