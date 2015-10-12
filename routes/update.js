var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    /* GET users listing. */
    router.get('/', function(req, res, next) {
        res.render('update',{navFirst: "", navUp:'active',navTeam: ""});
    });
    router.post('/', function() {
       Console.log('get a post');
    });
    return router;
};
