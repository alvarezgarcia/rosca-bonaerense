var intendentes_json = require(__dirname+'/intendentes.json');
var fs = require('fs');
var strftime = require('strftime');



exports.partido = function(req, res) {
	var partido = req.params.partido;

	var val = s(intendentes_json, 'partido', partido.toUpperCase()) || 'Municipio no encontrado';
	res.send(val);
};

exports.partidos = function(req, res) {
	res.send(clean_json(intendentes_json));
}

exports.agrupaciones = function(req, res) {
	var agrupacion_actual = req.params.agrupacion_actual.toUpperCase();

	var json_municipio = get_municipio_by(intendentes_json, 'agrupacion_actual', agrupacion_actual);
	res.send(clean_json(json_municipio));
};

exports.ultima_actualizacion = function(req, res) {

	fs.stat(__dirname+'/intendentes.json', function(err, stats) {
		var mtime = stats['mtime']
		res.send(strftime("%Y-%m-%d", mtime));
	});

};

function clean_json(json) {

	var ret_json = [];
	for(var k = 0; obj = json[k], k < json.length; k++) {

		var n_obj = {};
		
		n_obj['partido'] = obj['partido'].replace(/_/g, ' ');
		n_obj['nombre'] = obj['nombre'];
		n_obj['agrupacion_actual'] = obj['agrupacion_actual'];
		n_obj['agrupacion_anterior'] = obj['agrupacion_anterior'][0] || '-';
		n_obj['fecha_pase'] = obj['fecha_pase'][0] || '-';


		ret_json.push(n_obj);
	}

	return ret_json;
}


function get_municipio_by(intendentes_json, key, value) {

	var ret = [];

	for(var k = 0; k < intendentes_json.length; k++) {
		var obj = intendentes_json[k];
		if(obj[key] == value) {
			ret.push(obj);
		}
	}

	return ret;
}

function s(arr, k, v) {

	var arr_length = arr.length;

	for(var i = 0; i < arr_length; i++) {
		var obj = arr[i];
		for(var key in obj) {

			if(key == k) {
				if(obj[key] == v) {
					return obj;
				}
			}
		}
	}

	return false;
}
