// setup your backend

const express = require('express')
const app = express()
const request = require('request')
var numeral = require('numeral');

let url = 'https://api.coindesk.com/v1/bpi/currentprice.json'

app.use(express.static('public'))

app.get('/', (req, res) => {
    let price = " ";
    let symb = " ";
    res.render('index.ejs',{symb: symb, price:price})
})



app.get('/getPrice', (req, res) => {
    let code = req.query.code
    // console.log(req)
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            let data = JSON.parse(body);
            // console.log(data)
            let symb = data.bpi[code].symbol
            let newUrl = data.bpi[code].rate_float
            let newUrl2 = numeral(newUrl.toFixed(2)).format('0,0.00')
    res.render('index.ejs',{symb:symb, price:newUrl2})
}
}
    )
})

app.listen(3001, () => {
    console.log("Bitcoin app at listening on port 3001")
})