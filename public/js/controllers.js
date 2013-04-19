'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

	function stopEvent(e) {
		console.log('running cancel');
		if (e.preventDefault) e.preventDefault();
	}

	var base_url = 'http://nagi.ca/u/';

//	$http({method:'GET', url:'/api/name'}).
//		success(function (data, status, headers, config) {
//			$scope.name = data.name;
//		}).
//		error(function (data, status, headers, config) {
//			$scope.name = 'Error!'
//		});

	$scope.path = 'data:image/gif;base64,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';
	$scope.filename = 'Filename';
	$scope.progress = 0;

	$scope.changeName = function(){
		$scope.name = 'man';
	}

	$scope.upload = function(file){
		console.log(file.name);
		file.name = '123.png';
		console.log(file);
		var formData = new FormData();
		formData.append('file',file);
		console.log(formData);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/upload');
		xhr.onload = function() {
			$scope.progress =  100;
			$scope.$apply();
		};


		xhr.upload.onprogress = function (e) {
			if (e.lengthComputable) {
				var complete = (event.loaded / event.total * 100 | 0);
				$scope.progress = complete;
				$scope.$apply();
			}
		}

		xhr.send(formData);
	}

	function hash(str){
		var hash = 0;
		if (str.length == 0) return hash;
		for (var i = 0; i < str.length; i++) {
			var char = str.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}

	$scope.onDrop = function(e){
		this.name = 'man';

		stopEvent(e);
		var f = e.dataTransfer.files[0];
		var reader = new FileReader();

		reader.readAsDataURL(f);
		reader.onload = (function (theFile) {

			return function (e) {
				var src = e.target.result;
				if (src) {
					$scope.path = src;
					$scope.filename = theFile.name;
					var fileExtension = '.' + theFile.name.split('.').pop();
					$scope.link = 'http://'+ window.location.host + '/u/' + hash(theFile.name)+fileExtension;
					console.log($scope.link);
					$scope.$apply();
				}


			};
		})(f);
		$scope.upload(f);
	}

	$scope.onDragOver = function(e){
		stopEvent(e);
		e.dataTransfer.dropEffect = 'copy';
		return false;
	}

	$scope.onDragStart = function(e){
		stopEvent(e);
		e.dataTransfer.dropEffect = 'copy';
		return false;

	}


}

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
