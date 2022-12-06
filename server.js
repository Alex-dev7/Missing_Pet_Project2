// import 
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// create express app
const app = express()

// connection to mongo
mongoose.connect(process.env.DATABASE_URL)


// mongoose connections
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log(error))


// register the midleware methods
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))


// Routes
app.get('/', (req, res) => {
    res.send("<h1>The server is working</h1>")
})


const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
