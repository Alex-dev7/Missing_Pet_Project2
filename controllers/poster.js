//require dependencies
const express = require('express')
const Poster = require('../models/posters')


// route
const router = express.Router()


//authorization midleware
router.use((req, res, next) => {
    if(req.session.loggedIn) {
        next()
        // logic for the profile button
    } else {
        res.redirect('/user/login')
    }
})

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

// Report route
router.get('/report', (req, res) => {
    res.render('posters/report.ejs')
})

// NEW route
router.get('/new', (req, res) => {
    res.render('posters/new.ejs')
})

// POST route
router.post('/', (req, res) => {
 
    // create new poster
    Poster.create(req.body, (err, createdPoster) => {
        res.redirect('/posters')
        console.log(createdPoster)
    })
    
})






//report

// router.get('/:id/report', (req, res) => {
//     //getting the poster from database
//     console.log(req.params.id)
//     Poster.findById(req.params.id, (err, foundPoster) => {
//         res.render('posters/report.ejs', {
//             poster: foundPoster,
//             id: req.params.id
//         })
        
//     })
// })

// router.put('/:id', (req, res) => {

//     // req.body.status = req.body.status === "on" ? "Lost" : "Found"

//     Poster.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPoster) => {
//         res.redirect(`/posters`)
//     })
// })







// EDIT route
router.get('/:id/edit', (req, res) => {
    //getting the poster from database
    Poster.findById(req.params.id, (err, foundPoster) => {
        res.render('posters/edit.ejs', {poster: foundPoster})

    })
})

router.put('/:id', (req, res) => {

   

    Poster.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPoster) => {
        res.redirect(`/posters/${req.params.id}`)
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