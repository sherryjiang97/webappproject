var express = require('express');
var router = express.Router();

const {submitRatings} = require("../firebase-service")

/* GET users listing. */
router.get('/form', function(req, res, next) {
  res.render("submit_form");
});

router.post('/dashboard', async function(req, res, next) {
  console.log("FORM DATA", req.body)

  // Add a new document with a generated id.
  var date = new Date();
  var rate = {
    "course_name": req.body.course_name,
    "assessments": req.body.assessments,
    "difficulty": req.body.difficulty,
    "groupWork": req.body.groupWork,
    "submitTime": date
  }

  var submit = await submitRatings(rate);

  console.log('Added document with ID: ', submit.id);
  res.render("submit_success")


  req.flash("warning", "Ratings sent successfully!")
  res.redirect("/submit/form")
})

module.exports = router;
