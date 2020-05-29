const authorizeAdmin = (req, res, next) => {
    if(req.user.role === "admin"){
        next()
    } else {
        res.status('403').send({notice : "Unautherized User"})
    }
}

module.exports = {
    authorizeAdmin
}