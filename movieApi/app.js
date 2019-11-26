// foundation
const express = require('express')
const app = express();
var request = require("request");

// API
let url = 'https://api.themoviedb.org/3/movie/550?api_key=0b6b1dba39f0141c57069c6c70268fa0'
var key = "0b6b1dba39f0141c57069c6c70268fa0"

app.use(express.static('public'));

// Root Routes
app.get('/', (req, res) => {
    let movie = '';
    let sum = '';
    res.render('home.ejs',{movie:movie, sum:sum})
})

app.get('/searchResults', (req, res) => {
    var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing',
  qs: 
   { 
     page: '1',
     language: 'en-US',
     api_key: '0b6b1dba39f0141c57069c6c70268fa0' 
    },
  // total_results: 2,
  body: '{}' };
 
request(options, function (error, response, body) {
  if (error) throw new Error(error); 

  let data = JSON.parse(body);
  
  console.log(data);
   movie = data.results
   let movieArray = []
for(let i = 0; i < 10; i++) {
  movieArray.push(movie[i])
}
res.render('searchResults.ejs',{movie:movieArray})
//    console.log(data)
});
    
})

// listener
app.listen(3002, () => {
    console.log('Movie App listening on port 3000')
})

// movie = data.results
// let movieArray = []
// for(let i = 0; i < 2; i++) {
//   movieArray.push(movie[i])
// }
// // res.render('searchResults.ejs',{movie:movie})
// res.render('searchResults.ejs',{movie:movieArray})
