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
  		}
  		$scope.photoLoadEnd = function (data, idx) {
  			$scope.photos[idx].fileName = data.file.name;
  			$scope.photos[idx].fileType = data.file.type;
  			$scope.photos[idx].showDataUrl = data.showDataUrl;
  			$scope.photos[idx].saveDataUrl = data.saveDataUrl;
  			$scope.photos[idx].imgDataUrl = data.imgDataUrl;
  			$scope.loading = false;
  		}
	}
})(angular);
