// require dependencies
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Poster = require('../models/posters')

// create route
const router = express.Router()


// Routes


// the signup routes 
// get => form 
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs')
})

//post => submit form
router.post('/signup', async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    //create new user
    User.create(req.body, (err, user) => {
    //redirect to login page
    res.redirect('/user/login')
    })
    
})

// the login routes
// get => form 
router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

//post => submit form
router.post('/login', (req, res) => {
    // get the data from the request body
    const {username, password} = req.body
    User.findOne({username}, (err, user) => {
        //checking if user exists
        if(!user) {
            res.send(`user doesn't exists`)
        } else {
            // checking if password matches
            const result = bcrypt.compareSync(password, user.password)
            if(result) {
                req.session.username = username
                req.session.loggedIn = true
                res.redirect('/user/profile')
            } else {
                res.send('wrong password')
            }
        }
    })
})



// profile route
router.get('/profile', (req, res) => {
    
    // console.log(req.session.username)

        Poster.find({username: req.session.username})
    .then((posters) => {
        
             res.render('user/profile.ejs', {
                user: req.session.username,
                posters: posters

             })
    })
    .catch(err => console.log(err)) 
        
} )




// logout route
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

module.exports = router