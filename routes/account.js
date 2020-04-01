var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/account', function(req, res, next) {
  res.sendFile(path.join(__dirname + "account.html"));
});

module.exports = router;