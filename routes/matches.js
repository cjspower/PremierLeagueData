var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    /* GET users listing. */
    router.get('/:para', function(req, res, next) {
        var year = parseInt(req.params.para);
        db.query('SELECT * FROM allmatches WHERE season='+year+';', function(err, result) {
            if(err) console.log(err);
            var ret = [];
            for(var i=0;i<result.rows.length;i++) {
                ret.push(result.rows[i]);
                //console.log(result.rows[i].hometeam);
            }
            res.render('matches', { years: year, navFirst: "",navUp:"", navTeam:'', data: ret});
        });

    });
    return router;
};
