/**
 * Created by anderson on 10/10/15.
 */
var https = require('https');
var pg = require('pg');

function getData() {
    console.log('get Match data.');
    var options = {
        host: 'raw.githubusercontent.com',
        path: '/footballcsv/eng-england/master/2010s/2013-14/1-premierleague.csv'
    };
    var req = https.get(options, function (res) {
        console.log('RES STATUS ' + res.statusCode);
        var bodyChunks = [];
        res.on('data', function(chunk){
            bodyChunks.push(chunk);
        }).on('end',function(){
            var body = Buffer.concat(bodyChunks);
            console.log('BODY '+ body);
            return body;
        });
    })
}

getData();