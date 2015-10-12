var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navFirst: "active",navUp:'',navTeam:''});
});

module.exports = router;
