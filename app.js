// local photo test controller app

(function(angular){
	'use strict';

	angular.module('app', ['shared.directive']);

	angular.module('app')
	.controller('TestCtrl', ['$scope', testCtrl]);

  	function testCtrl ($scope) {
  		$scope.loading = false;
  		$scope.photos = [{}, {}];
  		$scope.photoLoadBegin = function (file, idx) {
  			$scope.loading = true;
  			//$scope.$apply();
  		}
  		$scope.photoLoadEnd = function (data, idx) {
  			$scope.photos[idx].fileName = data.file.name;
  			$scope.photos[idx].fileType = data.file.type;
  			$scope.photos[idx].dataUrl = data.dataUrl;
  			$scope.loading = false;
  			//$scope.$apply();
  		}
	}
})(angular);
