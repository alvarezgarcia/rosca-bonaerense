var MongoClient = require('mongodb').MongoClient;

var fs = require('fs');
var file = __dirname + '/intendentes.json';

fs.readFile(file, 'utf8', function (err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}

	data = JSON.parse(data);

	console.dir(data);

	MongoClient.connect("mongodb://root:1goshushijo6@ds061558.mongolab.com:61558/rosca_db", function(err, db) {

				if(err) { return console.dir(err); }
				console.log("Conectado");

				var collection = db.collection('partidos');
				collection.insert(data, function(e,r) {
					console.log('Data ingresada');	
				});

	});
});


