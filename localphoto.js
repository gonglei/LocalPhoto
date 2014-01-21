// local photo directive

(function (angular, window) {
    "use strict";

    angular.module('shared.directive', []);

    angular.module('shared.directive').directive('localPhoto', [localPhoto]);

    function localPhoto () {
        var directive = {
            restrict: 'A',
            template: '<div><input type="file" /><br/><canvas /></div>',
            link: link,
            scope: {
            	//maxWidth: '@',
            	onLoadBegin: '&',
            	onLoadEnd: '&',
            }
        };

        return directive;

        function link (scope, element, attrs) {
        	var canvas = element.find('canvas')[0],
        		fileInput = element.find('input')[0];

    		scope.maxWidth = !attrs.maxWidth ? element[0].clientWidth : +attrs.maxWidth || 1024;

        	angular.element(fileInput).bind('change', fileChanged);

	        function fileChanged (e) {
	        	var file = e.target.files[0];
	        	scope.file = file;
	        	scope.$apply(function(){
		        	scope.onLoadBegin({file: file});
	        	});
	            var reader = new window.FileReader();
	            reader.onload = function (e) { fetch(e.target.result); }
	            reader.readAsDataURL(file);
	        }

	        function fetch (dataUrl) {
	        	scope.dataUrl = dataUrl;
	            var img = new Image();
	            img.onload = function () { draw(img); }
	            img.src = dataUrl;
	        }

	        function draw (img) {
	        	var ctx = canvas.getContext('2d');
	        	ctx.clearRect(0, 0, canvas.width, canvas.height);
	        	canvas.width = img.width < scope.maxWidth ? img.width : scope.maxWidth;
	        	canvas.height = canvas.width * img.height / img.width;
	        	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	        	scope.$apply(function(){
		        	scope.onLoadEnd({data: {file: scope.file, dataUrl: scope.dataUrl}});
	        	});
	        }
        } // link
    } // loadPhoto

})(angular, window);
