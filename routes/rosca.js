var intendentes_json = require(__dirname+'/intendentes.json');



exports.partido = function(req, res) {
	var partido = req.params.partido;

	var val = s(intendentes_json, 'partido', partido.toUpperCase()) || 'Municipio no encontrado';
	res.send(val);
};

exports.partidos = function(req, res) {
	res.send(intendentes_json);
}

exports.agrupaciones = function(req, res) {
	var agrupacion_actual = req.params.agrupacion_actual.toUpperCase();
	res.send(get_municipio_by(intendentes_json, 'agrupacion_actual', agrupacion_actual));
};


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
