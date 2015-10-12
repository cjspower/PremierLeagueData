var https = require('https');
var fs = require('fs');

function getMatchData(year) {
    var options = {
        host: 'raw.githubusercontent.com',
        path: '/footballcsv/eng-england/master/2010s/20'+year+'-'+(year+1)+'/1-premierleague.csv'
    };
    var file = fs.createWriteStream('./DataSet/20'+year+'-'+(year+1)+'.csv');
    var req = https.get(options, function (response) {
        console.log('getting data');
        response.pipe(file);
    });
}

for(var i = 10;i<14;i++) {
    getMatchData(i);
}