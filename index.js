var express = require('express');
var rosca = require(__dirname+'/routes/rosca');

var port = process.env.PORT || 3000;

var app = express();

app.configure(function() {
	app.set('port', port);
});

app.get('/rosca/:partido', rosca.partido);

app.listen(port, function() {
	console.log('Rosca iniciada en '+port);
});
