// import 
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Poster = require('./models/posters')
const PosterRouter = require('./controllers/poster')


// create express app
const app = express()


// register the midleware methods
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.use('/posters', PosterRouter)


// Routes
app.get('/', (req, res) => {
    res.redirect('/posters')
})



const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
