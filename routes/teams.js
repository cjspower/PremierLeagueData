var express = require('express');
module.exports = function(db) {
    var router = express.Router();
    router.get('/',function(req, res) {
        db.query('SELECT * FROM allteam', function(err, result) {
            if(err) console.log(err);
            var ret = [];
            for(var i=0;i<result.rows.length;i++) {
                ret.push(result.rows[i]);
                //console.log(result.rows[i].hometeam);
            }
            //res.redirect('/');
            res.render('team', {navFirst: "",navUp:"", navTeam:'active', data: ret});
        });
    });
    return router;
};