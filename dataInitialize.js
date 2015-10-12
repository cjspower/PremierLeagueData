var pg = require('pg');
var fs = require('fs');
var parse = require('csv-parse');

var connectionString = 'postgres://pfswqkxqtxkgre:8mEq-8_QcqoDkg9CZ7xMeuInzy@ec2-54-225-201-25.compute-1.amazonaws.com:5432/deg7cmst5oa3fg?ssl=true';
var client = new pg.Client(connectionString);
client.connect(function(err){
    if(err) {
        console.log(JSON.stringify(err));
    }
});

fs.readFile('./DataSet/2013-14.csv', {
        encoding: 'utf-8'
    }, function(err, csvData) {
        if(err) {
            console.log(err);
        }
        parse(csvData, {
            delimiter: ','
        }, function(err, data) {
           if(err) {
               console.log(err);
           } else {
               for(var i = 1;i < data.length;i++) {

                   console.log(data[i][1]);
                   client.query('INSERT INTO allteam ' +
                       'VALUES(\'' + data[i][1]+'\');', function(err) {
                       if(err) {
                           console.log('error '+err);
                       }
                   });
                    /*
                   var scores = data[i][3].split('-');
                   console.log('INSERT INTO allmatches(' +
                       'id,' +
                       'matchDate,' +
                       'homeTeam,' +
                       'awayTeam,' +
                       'homeScore,' +
                       'awayScore,' +
                       'season' +
                       ')' +
                       'VALUES(DEFAULT,' +
                       '\'' + data[i][0] + '\',' +
                       '\'' + data[i][1] + '\',' +
                       '\'' + data[i][2] + '\',' +
                       scores[0] + ',' +
                       scores[1] + ',' +
                           '2011' +
                       ');');*/

                   var scores = data[i][3].split('-');
                   client.query('INSERT INTO allmatches(' +
                       'id,' +
                       'matchDate,' +
                       'homeTeam,' +
                       'awayTeam,' +
                       'homeScore,' +
                       'awayScore,' +
                       'season' +
                       ')' +
                       'VALUES(DEFAULT,' +
                       '\'' + data[i][0] + '\',' +
                       '\'' + data[i][1] + '\',' +
                       '\'' + data[i][2] + '\',' +
                       scores[0] + ',' +
                       scores[1] + ',' +
                       '2013' +
                       ');'
                   , function(err) {
                           if(err) {
                               console.log(err);
                           }
                       });
               }
           }
        });
    });

//query.on('end', function () {
//    client.end();
//});
