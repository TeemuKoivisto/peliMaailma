var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('app is listening on port', app.get('port'));
});