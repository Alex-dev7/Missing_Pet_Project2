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

        // res.redirect('/')
            // get the data from the database
            Poster.find({})
            .then((posters) => {
                res.render('index.ejs', {posters})
                
            })
            .catch(err => console.log(err)) 
}
})

// Poster Routes 



// INDEX route
router.get('/', (req, res) => {
    
    // get the data from the database
    Poster.find({})
    .then((posters) => {
        res.render('posters/index.ejs', {posters})
        console.log(posters)
    })
    .catch(err => console.log(err))
})





// NEW route
router.get('/new', (req, res) => {
    res.render('posters/new.ejs', {user: req.session.username})
})



// POST route
router.post('/', (req, res) => {
    req.body.username = req.session.username

    // create new poster
    Poster.create(req.body, (err, createdPoster) => {
        res.redirect('/posters')
        console.log(createdPoster)
    })
    
})


// Report route
router.get('/:id/report', (req, res) => {
    // console.log(`----------------- ${req.params.id}`)
    //getting the poster from database
    Poster.findById(req.params.id, (err, foundPoster) => {
        res.render('posters/report.ejs', {poster: foundPoster})

    })
})



// EDIT route
router.get('/:id/edit', (req, res) => {
    Poster.findById(req.params.id)
    .then((poster) => {
        if(req.session.username === poster.username) {
             //getting the poster from database
    Poster.findById(req.params.id, (err, foundPoster) => {
        res.render('posters/edit.ejs', {poster: foundPoster})

    })
       } else {
            res.send(`<dialog style="text-align: center" open>you are not authorized to edit this post<br><a href="/posters"><button >BACK</button></a></dialog>`)
       }
        // console.log(poster)
    })
    .catch(err => console.log(err))
    
})

router.put('/:id', (req, res) => {

    if(req.body.type) {
            Poster.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPoster) => {
            res.redirect(`/posters/${req.params.id}`)
            })
    } else {
        // push new reports to the array
        Poster.findByIdAndUpdate(req.params.id, { $push: { reports: req.body  } }, {new: true}, (err, updatedPoster) => {
                    res.redirect(`/posters`)
                })
    }

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
  
    // find the poster by id and check if req.session.username is the owner of the poster
    // only if true delete
   Poster.findById(req.params.id)
    .then((poster) => {
        if(req.session.username === poster.username) {
              //find by id and delete
            Poster.findByIdAndDelete(req.params.id, (err, deletedPoster) => {
               res.redirect('/posters')
            })
       } else {
            res.send(`<dialog style="text-align: center" open>you are not authorized to delete this post<br><a href="/posters"><button >BACK</button></a></dialog>`)

       }
        console.log(poster)
    })
    .catch(err => console.log(err))
 
    // console.log(poster)
 })

 

module.exports = router
