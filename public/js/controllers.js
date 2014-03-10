var roscaApp = angular.module('roscaApp', []);

roscaApp.controller('PartidosListaController', function($scope, $http) {

	$http.get('partidos/').success(function(data) {
		$scope.partidos = data;
	});

});
