var roscaApp = angular.module('roscaApp', []);

roscaApp.controller('PartidosListaController', function($scope, $http) {

	$http.get('partidos/').success(function(data) {
		$scope.partidos = data;
	});

	$scope.filtrar = function(agrupacion_actual) {
		console.log(agrupacion_actual);

		$http.get('agrupaciones/'+agrupacion_actual).success(function(data) {
			$scope.partidos = data;
		});

	}

});
