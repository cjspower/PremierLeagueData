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

var config = {
    host: 'ec2-54-225-201-25.compute-1.amazonaws.com',
    port: 5432,
    database: 'deg7cmst5oa3fg',
    user: 'pfswqkxqtxkgre',
    password: '8mEq-8_QcqoDkg9CZ7xMeuInzy',
    ssl: true
};
var connectionString = process.env.DATABASE_URL || 'postgres://pfswqkxqtxkgre:8mEq-8_QcqoDkg9CZ7xMeuInzy@ec2-54-225-201-25.compute-1.amazonaws.com:5432?ssl=true/deg7cmst5oa3fg';
var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE teamlist(id SERIAL PRIMARY KEY, team VARCHAR(40))');
query.on('end', function () {
    client.end();
});


//getData();