
var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/form', function(req, res, next) {
  res.render("ratings_form");
});

router.post('/dashboard', function(req, res, next) {
    console.log("FORM DATA", req.body)
    var symbol = req.body.symbol || "OOPS"
    console.log("STOCK SYMBOL", symbol)
  
   // var requestUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}` // using string interpolation here, but you could alternatively do concatenation with + operators
   // console.log("REQUEST URL", requestUrl)
  
    fetch(requestUrl)
      .then(function(response) {
          return response.json()
      })
      .then(function(data){
          console.log("RATINGS DATA SUCCESS", Object.keys(data))
          //var latestClose = Object.values(data["Time Series (Daily)"])[0]["5. adjusted close"]
          req.flash("success", "Ratings Data Request Success!")
          //res.render("ratings_dashboard", {symbol: symbol, data: JSON.stringify(data), latestClose: latestClose});
        })
      .catch(function(err){
        console.log("RATINGS DATA ERROR:", err)
        req.flash("danger", "OOPS, Please check your inputs and try again.")
        res.redirect("/ratings/form")
      })
  });

module.exports = router;
