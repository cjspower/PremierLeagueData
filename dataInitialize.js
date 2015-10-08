var https = require('https');
var pg = require('pg');

function getData() {
    console.log('get Match data.');
    var options = {
        host: 'raw.githubusercontent.com',
        path: '/openfootball/eng-england/master/2015-16/1-premierleague.yml'
    };
    var req = https.get(options, function (res) {
        console.log('RES STATUS ' + res.statusCode);
        var bodyChunks = [];
        res.on('data', function(chunk){
            bodyChunks.push(chunk);
        }).on('end',function(){
            var body = Buffer.concat(bodyChunks);
            //console.log('BODY '+ body);
            return body;
        });
    })
}

var body = getData();

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
var client = new pg.Client(connectionString);
client.connect();


//getData();