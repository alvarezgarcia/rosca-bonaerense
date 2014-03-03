var intendentes_json = require(__dirname+'/intendentes.json');



exports.partido = function(req, res) {
	var partido = req.params.partido;

	var val = s(intendentes_json, 'partido', partido.toUpperCase()) || 'Municipio no encontrado';
	res.send(val);
};


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
