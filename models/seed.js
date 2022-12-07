// require dependencies
const mongoose = require('./connection')
const Poster = require('./posters')

// Our Seed

mongoose.connection.on('open', () => {


    // array of starter posters
    const existingPosters = [
        {name: "Brian", location: "Quahog, Rhode Island", type: "Dog", sex: "Male", details: "went clubbing, never came back", number: 412426252725222, status: true, img: "https://upload.wikimedia.org/wikipedia/en/1/12/Brian_Griffin.png" },
        {name: "Snowball", location: "New York City, Sewage", type: "Rabbit", sex: "Male", details: "went to war", number: 6252725222, status: true, img: "https://i.pinimg.com/736x/6e/b1/b4/6eb1b4b68b615af502bc15d6af3ef9ea--movies-of--pet-rabbit.jpg" }
    ]

    //delete all posters
    Poster.deleteMany({}, (err, data) => {

        Poster.create(existingPosters, (err, data) => {
            console.log(data)
        })
    })
})

