var express = require('express');
var rosca = require(__dirname+'/routes/rosca');

var port = process.env.PORT || 3000;

var app = express();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.set('port', port);
});



app.get('/partidos', rosca.partidos);
app.get('/partidos/:partido', rosca.partido);
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});



app.listen(port, function() {
	console.log('rosca-bonaerense iniciada en '+port);
});
