const express = require('express');
const app = express();
const yelp = require('yelp-fusion');

app.use(express.static('public'));
// var key = "ttvMX-W_SRuKckjtiqSRXg1jRIuj39HZgT3MQujdqD_eXLPZal777qIXA9oJtFFd6SLJwXFJmmOeLFaQKTo0FUbuYdD9YcZ99CmXN4m3FItcIWh0haF0wEap0Qu2XHYx"
const client = yelp.client("ttvMX-W_SRuKckjtiqSRXg1jRIuj39HZgT3MQujdqD_eXLPZal777qIXA9oJtFFd6SLJwXFJmmOeLFaQKTo0FUbuYdD9YcZ99CmXN4m3FItcIWh0haF0wEap0Qu2XHYx");

let url ='https://api.yelp.com/v3/businesses/search'

// var clientID = "NiWypEI2uQNX18BgWvHQ6g"

// const search_limit = 10


app.get('/', (req, res) =>{
    var foodPlace = ' ';
    res.render('home.ejs',{foodPlace:foodPlace})
})
 app.get('/searchResults',(req, res) => {   
       let foodPlace = req.query.foodPlace
       
    client.search({
        term: 'restaurants',
       location:foodPlace,
       limit:10
       
      }).then(response => {
          
       foodlist= response.jsonBody.businesses;
        res.render('searchResults.ejs',{stuff:foodlist})

      }).catch(err => {
        console.log(err);
      }); 
    
 })



 app.listen(3000, () => {
     console.log('App is listening in port 3000.')
 }) 