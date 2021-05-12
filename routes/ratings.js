
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
  } catch (error) {
    req.flash("danger", error)
    res.redirect("/ratings")
  }
  var difficulty = []
  var assessments = []
  var groupWork = []
  reviews.forEach(function(review) {
    difficulty.push(review.difficulty)
    assessments.push(review.assessments)
    groupWork.push(review.groupWork)
  })

  var difficultyTotal = 0;
  var assessmentsTotal = 0;
  var groupWorkTotal = 0;

  for(var i = 0; i < difficulty.length; i++) {
      difficultyTotal += difficulty[i];
  }
  for(var i = 0; i < assessments.length; i++) {
    assessmentsTotal += assessments[i];
  }
  for(var i = 0; i < groupWork.length; i++) {
    groupWorkTotal += groupWork[i];
  }

  var avgDifficulty = difficultyTotal / difficulty.length;
  var avgAssessments = assessmentsTotal / assessments.length;
  var avgGroupWork = groupWorkTotal / groupWork.length;

  var avgScores = [avgDifficulty, avgAssessments, avgGroupWork];

  var pageTitle;
  switch(course) {
    case "finance":
      pageTitle = "Financial Markets & Corporate Decision Making";
      break;
    case "marketing":
      pageTitle = "Marketing Analysis & Customer Strategy";
      break;
    case "stats":
      pageTitle = "Managerial Statistics";
      break;
    case "aps":
      pageTitle = "Analytical Problem Solving";
      break;
    default:
      pageTitle = "your selected course";
  }

  res.render("ratings_dashboard", {"reviews": reviews, "averages": avgScores, "title": pageTitle})

  req.flash("warning", "Ratings retrieved successfully!")
  //res.redirect("/ratings_form")
})

module.exports = router;