var express = require('express');
var app = express();
//var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('app is listening on port', app.get('port'));
});