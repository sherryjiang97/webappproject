var express = require('express');
var router = express.Router();

const {submitRatings} = require("../firebase-service")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("submit_form");
});

router.post('/success', async function(req, res, next) {
  console.log("FORM DATA", req.body)

  // Add a new document with a generated id.
  var date = new Date();
  var rate = {
    "course_name": req.body.course_name,
    "assessments": parseInt(req.body.assessments),
    "difficulty": parseInt(req.body.difficulty),
    "groupWork": parseInt(req.body.groupWork),
    "comments": req.body.comments,
    "submitTime": date
  }

  try {
    var submit = await submitRatings(rate);
  } catch {
    req.flash("danger", "OOPS, failed to submit ratings.")
    res.redirect("/")
  }
  
  res.render("submit_success")

  req.flash("warning", "Ratings sent successfully!")
  res.redirect("/submit")
})

module.exports = router;
