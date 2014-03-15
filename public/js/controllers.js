var roscaApp = angular.module('roscaApp', []);

roscaApp.controller('PartidosListaController', function($scope, $http) {

	$http.get('partidos/').success(function(data) {

		var agrupaciones = {};
		var agrupaciones_ordenadas = [];
		var agrupaciones_final = {};

		for(var k = 0; obj = data[k], k < data.length; k++) {

			if(agrupaciones[obj['agrupacion_actual']])
				agrupaciones[obj['agrupacion_actual']]++;
			else
				agrupaciones[obj['agrupacion_actual']] = 1;
				
		}

		for(var agrupacion in agrupaciones) {
			agrupaciones_ordenadas.push([agrupacion, agrupaciones[agrupacion]]);
			agrupaciones_ordenadas.sort(function(a, b) {return b[1] - a[1]});
		}


		$scope.agrupaciones = agrupaciones_ordenadas;
		$scope.partidos = data;
	});

	$scope.filtrar = function(agrupacion_actual) {

		$http.get('agrupaciones/'+agrupacion_actual).success(function(data) {
			$scope.partidos = data;
		});

	}


});
