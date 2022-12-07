//require dependencies
require('dotenv').config()
const mongoose = require('mongoose')

// setup inputs
const DATABASE_URL = process.env.DATABASE_URL


// connection to mongo
mongoose.connect(process.env.DATABASE_URL)


// mongoose connections
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log(error))

module.exports = mongoose