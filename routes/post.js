var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    /* GET users listing. */
    router.post('/', function(req, res) {
        var home = req.body.home,
            away = req.body.away,
            homescore = parseInt(req.body.hscore),
            awayscore = parseInt(req.body.ascore),
            date = Date.parse(req.body.mdate),
            season = parseInt(req.body.season);
        if(home!=''&&away!=''&&homescore>=0&&awayscore>=0&&date>=0&&season>=1900) {
            db.query('INSERT INTO allmatches(' +
                'id,' +
                'matchDate,' +
                'homeTeam,' +
                'awayTeam,' +
                'homeScore,' +
                'awayScore,' +
                'season' +
                ')' +
                'VALUES(DEFAULT,' +
                '\'' + req.body.mdate + '\',' +
                '\'' + home + '\',' +
                '\'' + away + '\',' +
                homescore + ',' +
                awayscore + ',' +
                season +
                ');', function(err, result) {
                    if(err) {
                        res.render('submitError', {navFirst: "", navUp: 'active', navTeam:'' , errormessage: err.detail});
                    }else {
                        res.render('index', {navFirst: "", navUp: 'active', navTeam:''});
                    }
                });
        }else {
            res.render('submitError', {navFirst: "", navUp: 'active', navTeam: '', errormessage: 'illegal data type:'+home+away+homescore+awayscore+date+season});
        }
    });
    return router;
};
