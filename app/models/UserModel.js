const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({

    name : {
        type : String
    },

    username : {
        type : String,
        required : true,
        unique : true
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

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel