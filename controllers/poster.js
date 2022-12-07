//require dependencies
const express = require('express')
const Poster = require('../models/posters')


// route
const router = express.Router()



// Poster Routes 



// INDEX route
router.get('/', (req, res) => {

    // get the data from the database
    Poster.find({})
    .then((posters) => {
        res.render('index.ejs', {posters})
        console.log(posters)
    })
    .catch(err => console.log(err))
})

// NEW route
router.get('/new', (req, res) => {
    res.render('posters/new.ejs')
})

// POST route
router.post('/', (req, res) => {
    // req.body.status = req.body.status === "on" ? "Lost" : "Found"
 
    // create new poster
    Poster.create(req.body, (err, createdPoster) => {
        res.redirect('/posters')
        console.log(createdPoster)
    })
    
})

// EDIT route
router.get('/:id/edit', (req, res) => {
    //getting the poster from database
    Poster.findById(req.params.id, (err, foundPoster) => {
        res.render('posters/edit.ejs', {poster: foundPoster})

    })
})

router.put('/:id', (req, res) => {

    // req.body.status = req.body.status === "on" ? "Lost" : "Found"

    Poster.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAnimal) => {
        res.redirect(`/animals/${req.params.id}`)
    })
})


// SHOW route
router.get('/:id', (req, res) => {
    Poster.findById(req.params.id)
    .then((poster) => {
        res.render('posters/show.ejs', {poster})
        // console.log(poster)
    })
    .catch(err => console.log(err))
 })


 // DELETE route 
 router.delete('/:id', (req, res) => {
    //find by id and delete

    Poster.findByIdAndDelete(req.params.id, (err, deletedPoster) => {
        res.redirect('/posters')
    })
 })


module.exports = router