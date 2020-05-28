const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Schema = mongoose.Schema

const userSchema = new Schema({

    name : {
        type : String
    },

    username : {
        type : String,
        required : true    
    },

    email : {
        type : String
    },

    mobile : {
        type : String
    },

    password : {
        type : String
    },

    ips : {
        register : [String],
        login : [String],
        logout : [String]
    },

    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : Date.now()
            }
        }
    ],

    role : {
        type : String,
        enum : ['admin', 'customer', 'chef']
    },

    loginCount : {
        type : Number,
        default : 0
    },

    gender : {
        type : String,
        enum : ["Male", "Female"]
    },

    avatar : {
        type : String
        
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})


// encryption the password by bcryptjs 
userSchema.pre("save", function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(salt => {
            bcryptjs.hash(user.password, salt)
                .then(encryptedPassword => {
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function(username, password){
    const UserModel = this
    return UserModel.findOne({username})
            .then(UserModel => {
                if(!UserModel){
                    return Promise.reject({errors : "Invalid Email id or password"})
                }
                return bcryptjs.compare(password, UserModel.password)
                    .then(result => result ? Promise.resolve(UserModel) : Promise.reject({error : "Invalid Email id or password"}))

                    .catch(err => Promise.reject(err))
            })

    .catch(err => Promise.reject(err))

    }

userSchema.methods.generateToken = function(ip){
    const user = this
    console.log("token")
    const tokenData = {
        id : user._id,
        username : user.username,
        role : user.role,
        createdAt : Date.now()
    }

    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({token})
    user.ips.login.push(ip)
    user.loginCount += 1
    console.log("token")
    return user.save()
        .then(user => Promise.resolve(token))
        .catch(err => Promise.reject(err))
}

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel