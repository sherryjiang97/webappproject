
// var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

const {fetchProducts} = require("../firebase-service")
// const {fetchRatings} = require("../firebase-service")

/* GET course rating. */
router.get('/', async function(req, res, next) {
  try {
      var products = await fetchProducts()
      // var products = await fetchRatings()
      res.render("ratings_form", {"ratings_form": products})
  } catch (error) {
      req.flash("danger", "OOPS, failed to fetch products.")
      res.redirect("/")
  }
})

router.post('/dashboard', function(req, res, next) {
  console.log("FORM DATA", req.body)
  var productId = req.body.productId
  var productName = req.body.productName
  var productPrice = req.body.productPrice
  // todo: maybe update the form / flow to ask the user for this info as well...
  //var userEmail = "customer@example.com"
  //var quantity = 1
  //var totalPrice = productPrice * quantity
  console.log("TODO: ORDER PRODUCT", productId, productName, productPrice)

  req.flash("warning", "Order sent successfully (TODO)!")
  res.redirect("/ratings_form")
})

module.exports = router;