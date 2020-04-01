var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/goals', function(req, res, next) {
  res.sendFile(path.join(__dirname + "goals.html"));
});

module.exports = router;
