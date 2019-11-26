// Foundation 
const express = require('express')
const app = express();
var request = require("request");
const curl = new (require( 'curl-request' ))();

// API - to search for Characters
let url = "https://swapi.co/api/people/"

// Public folder
app.use(express.static('public'));

// Routes - homepage and results page
app.get('/', (req, res) => {
    let people = {}
    res.render('home.ejs',{people:people})
})

app.get('/searchResults', function(req, res) {
    // Name of the input in home.ejs
    var peopleSearch = req.query.personNum;

    request(url, function(error,response,body) {
        var data = JSON.parse(body);
        
        console.log(data);
    //     // attaching Name to drill into data. Data is a string that has an object
    //     people = data.results[peopleSearch]
        
    //    console.log(people)
    //     res.render('searchResults.ejs', {people: people});

        if (!error && response.statusCode == 200) {
           // attaching Name to drill into data. Data is a string that has an object
        people = data.results[peopleSearch]
        
        console.log(people)
         res.render('searchResults.ejs', {people: people});
        }
    });
});


app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs')
})

// Listener, port 3000
app.listen(3000, () => {
    console.log("Star wars App listening on port 3000")
})