const mongoose = require('mongoose')
require('dotenv').config()

const connection_url = process.env.DB_MONGODB_ATLAS_URL || 'mongodb://localhost:27017home-made-food'

const setupDB = () => {
    // mongoose.connect('mongodb://localhost:27017home-made-food', {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})

    mongoose.connect(connection_url, {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})
        .then(() => console.log('Connected with the database'))

        .catch(err => console.log(err))
}

module.exports = setupDB