const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017home-made-food', {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})
        .then(() => console.log('Connected with the database'))

        .catch(err => console.log(err))
}

module.exports = setupDB