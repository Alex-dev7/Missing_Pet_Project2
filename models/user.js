// require dependencies

const mongoose = require("./connection")


//pull schema and model from mongoose
const {Schema, model} = mongoose

// make user schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    reports: [{
        name: String,
        message: String,
    }]
})

// make user model
const User = model("User", userSchema)

module.exports = User