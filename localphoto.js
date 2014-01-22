// local photo directive

(function (angular, window, document) {
    "use strict";

    angular.module('shared.directive', []);

    angular.module('shared.directive').directive('localPhoto', [localPhoto]);

    function localPhoto () {
        var directive = {
            restrict: 'A',
            template: '<div><input type="file" /><br/><canvas /></div>',
            link: link,
            scope: {
            	//showSize: '@',
            	//saveSize: '@',
            	onLoadBegin: '&',
            	onLoadEnd: '&',
            }
        };

        return directive;

        function link (scope, element, attrs) {
        	var canvas = element.find('canvas')[0],
        		fileInput = element.find('input')[0];

			init();
        	angular.element(fileInput).bind('change', fileChanged);

        	function init () {
        		scope.showSize = attrs.showSize && attrs.showSize.split('x').length === 2 
        			? [+attrs.showSize.split('x')[0], +attrs.showSize.split('x')[1]]
        			: [element[0].clientWidth, element[0].clientWidth * 3 / 4];
        		scope.saveSize = attrs.saveSize && attrs.saveSize.split('x').length === 2 
        			? [+attrs.saveSize.split('x')[0], +attrs.saveSize.split('x')[1]]
        			: [1024, 768];
        	}

	        function fileChanged (event) {
	        	var file = event.target.files[0];
	        	scope.file = file;
	        	scope.$apply(function(){
		        	scope.onLoadBegin({file: file});
	        	});
	            var reader = new window.FileReader();
	            reader.onload = function (e) { fetch(e.target.result); };
	            reader.readAsDataURL(file);
	        }

	        function fetch (dataUrl) {
	        	scope.imgDataUrl = dataUrl;
	            var img = new Image();
	            img.onload = function () { draw(img); };
	            img.src = dataUrl;
	        }

	        function draw (img) {
	        	var ctx = canvas.getContext('2d');
	        	ctx.clearRect(0, 0, canvas.width, canvas.height);
	        	canvas.width = img.width < scope.showSize[0] ? img.width : scope.showSize[0];
	        	canvas.height = canvas.width * img.height / img.width;
	        	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	        	scope.$apply(function(){
		        	scope.onLoadEnd({data: {
		        		file: scope.file,
		        		imgDataUrl: scope.imgDataUrl,
		        		showDataUrl: canvas.toDataURL(scope.file.type),
		        		saveDataUrl: getSaveDataUrl(img)
		        	}});
	        	});
	        }

	        function getSaveDataUrl (img) {
	        	var cvs = document.createElement("canvas");
	        	var ctx = cvs.getContext('2d');
	        	cvs.width = scope.saveSize[0];
	        	cvs.height = cvs.width * img.height / img.width;
	        	ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
	        	return cvs.toDataURL(scope.file.type);
	        }
        } // link
    } // loadPhoto

})(angular, window, document);
