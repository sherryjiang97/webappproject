
// var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

const {fetchRatings} = require("../firebase-service")

/* GET course rating. */
router.get('/', function(req, res, next) {
  res.render("ratings_form");
})

router.post('/dashboard', async function(req, res, next) {
  console.log("FORM DATA", req.body)
  var course = req.body.course_name
  console.log("COURSE REQUESTED:", course)


  try {
    var reviews = await fetchRatings(course);
  } catch {
    req.flash("danger", "OOPS, failed to fetch course.")
    res.redirect("/")
  }


  res.render("ratings_dashboard", {"reviews": reviews})

  req.flash("warning", "Order sent successfully (TODO)!")
  //res.redirect("/ratings_form")
})

module.exports = router;