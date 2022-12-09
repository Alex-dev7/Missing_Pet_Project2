// require dependencies
const mongoose = require('./connection')


const {Schema, model} = mongoose

// poster schema
const postersSchema = new Schema ({
    name: String,
    location: String,
    type: String,
    sex: String,
    details: String,
    number: Number,
    status: String,
    username: String,
    img: String,
    reports: {
        message: String,
    },
    
})

// poster model
const Poster = model('Poster', postersSchema)

module.exports = Poster

