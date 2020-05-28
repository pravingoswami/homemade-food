const mongoose = require('mongoose')
require('dotenv').config()

// const connection_url = process.env.DB_MONGODB_ATLAS_URL || 'mongodb://localhost:27017home-made-food'
// const connection_url = process.env.DB_MONGODB_ATLAS_URL
// const connection_url = "mongodb+srv://pravingoswami:MongoDB@cluster0-p1rgt.mongodb.net/test?retryWrites=true&w=majority"

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/home-made-food', {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})

    // mongoose.connect("mongodb+srv://pravingoswami:MongoDB@cluster0-p1rgt.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})
        .then(() => console.log('Connected with the database'))

        .catch(err => console.log(err))
}

module.exports = setupDB