var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    /* GET users listing. */
    router.get('/:para', function(req, res, next) {
        db.query('SELECT * FROM ALLMATCHES WHERE ID = '+req.params.para+';', function(err,result) {
            if(err) console.log(err);
            var ret = result.rows[0];
            res.render('edit',{navFirst: "", navUp:'',navTeam: "", match: ret});
        });
    });
    return router;
};
