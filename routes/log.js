var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/log', function(req, res, next) {
  res.sendFile(path.join(__dirname + "log.html"));
});

module.exports = router;