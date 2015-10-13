var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    /* GET users listing. */
    router.post('/update', function(req, res) {
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
                        res.redirect('/matches/'+season);
                    }
                });
        }else {
            res.render('submitError', {navFirst: "", navUp: 'active', navTeam: '', errormessage: 'illegal data type:'+home+away+homescore+awayscore+date+season});
        }
    });

    router.post('/edit/:para', function(req, res) {
        var id = req.params.para;
        var home = req.body.home,
            away = req.body.away,
            homescore = parseInt(req.body.hscore),
            awayscore = parseInt(req.body.ascore),
            date = Date.parse(req.body.mdate),
            season = parseInt(req.body.season);
        var query = 'UPDATE allmatches SET ';
        if(home!='') {
            query += 'hometeam=\'' + home+'\', ';
        }
        if(away!='') {
            query += 'awayteam=\'' + away+'\', ';
        }
        if(req.body.hscore!=''&&homescore>=0) {
            query += 'homescore=' + homescore+', ';
        }
        if(req.body.ascore!=''&&awayscore>=0) {
            query += 'awayscore=' + awayscore+', ';
        }
        if(date>=0) {
            query += 'matchdate=' + req.body.mdate +', ';
        }
        if(season>=1900) {
            query += 'season=' + season + ', ';
        }
        query = query.substring(0, query.length-2);
        query += ' WHERE id=' + id +';';
        db.query(query, function(err){
            if(err) console.log(err);
            if(season>=1900) {
                res.redirect('/matches/'+season);
            } else {
                res.redirect('/matches/id/'+id);
            }
        });
    });

    router.post('/search', function(req, res) {
        //console.log(req);
        var request = req.body.foobar;
        console.log(request);

        if(Date.parse(request)>0) {
            db.query('SELECT * FROM allmatches WHERE matchdate=\''+request+'\';', function(err, result) {
                if(err) {
                    res.render('oops', {navFirst: "", navUp: "", navTeam: '', errormessage: JSON.stringify(err)});
                } else {
                    var ret = [];
                    if(result.rows.length == 0) {
                        res.render('oops', {navFirst: "", navUp: "", navTeam: '', errormessage: 'no result fits your search'});
                    }else {
                        for (var i = 0; i < result.rows.length; i++) {
                            ret.push(result.rows[i]);
                            //console.log(result.rows[i].hometeam);
                        }
                        res.render('matchesnoyear', {navFirst: "", navUp: "", navTeam: '', data: ret});
                    }
                }
            });
        }else {
            db.query('SELECT * FROM allteam WHERE teamName=\''+request+'\';', function(err, result) {
                if(err) {
                    res.render('oops', {navFirst: "", navUp: "", navTeam: '', errormessage: JSON.stringify(err)});
                } else {
                    if(result.rows.length == 0) {
                        res.render('oops', {navFirst: "", navUp: "", navTeam: '', errormessage: 'Team does not exist'});
                    } else {
                        db.query('SELECT * FROM allmatches WHERE ' +
                            'hometeam=\''+request+'\' OR awayteam=\''+request+'\' ORDER BY matchdate DESC;', function(err, result) {
                            if(result.rows.length==0) {
                                res.render('oops', {navFirst: "", navUp: "", navTeam: '', errormessage: 'no result fits your search'});
                            }else {
                                var ret = [];
                                for (var i = 0; i < result.rows.length; i++) {
                                    ret.push(result.rows[i]);
                                    //console.log(result.rows[i].hometeam);
                                }
                                res.render('matchesnoyear', {navFirst: "", navUp: "", navTeam: '', data: ret});
                            }
                        });
                    }
                }
            });
        }
    });
    return router;
};
