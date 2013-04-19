'use strict';

/* Directives */

var mod = angular.module('myApp.directives', []);

mod.directive('appVersion', ['version', function (version) {
	return function (scope, elm, attrs) {
		elm.text(version);
	};
}]);


mod.directive("dropZone", function () {
	return function (scope, elm) {

		elm.bind('dragover', scope.onDragOver);

		elm.bind('dragenter', scope.onDragStart);

		elm.bind('drop', scope.onDrop);

	}

});