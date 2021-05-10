var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/form', function(req, res, next) {
  res.render("submit_form");
});

module.exports = router;
