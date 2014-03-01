var express = require('express');
var rosca = require(__dirname+'/routes/rosca');


var app = express();

app.get('/rosca/:partido', rosca.partido);

var port = 3000;
app.listen(port, function() {
	console.log('Rosca iniciada en '+port);
});
