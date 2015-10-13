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

    router.get('/id/:para', function(req, res, next) {
        var matchid = parseInt(req.params.para);
        console.log(matchid);
        db.query('SELECT * FROM allmatches WHERE id='+matchid+';', function(err,result) {
            if(err) console.log(err);
            //console.log(JSON.stringify(result));
            var ret = [];
            for(var i=0;i<result.rows.length;i++) {
                ret.push(result.rows[i]);
            }
            res.render('matches', { years: parseInt(ret[0].season), navFirst: "",navUp:"", navTeam:'', data: ret});
        })

    });

    router.get('/delete/:para/:nextpara', function (req, res, next) {
        var matchid = parseInt(req.params.para);
        db.query('DELETE FROM allmatches WHERE id='+matchid+';', function(err) {
            if(err) console.log(err);
            res.redirect('/matches/'+req.params.nextpara);
        });
    });
    return router;
};
