'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

	function stopEvent(e) {
		if (e.preventDefault) e.preventDefault();
	}

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};

	var download_folder = '/u/';

//	$http({method:'GET', url:'/api/name'}).
//		success(function (data, status, headers, config) {
//			$scope.name = data.name;
//		}).
//		error(function (data, status, headers, config) {
//			$scope.name = 'Error!'
//		});

	$scope.path = '';
	$scope.filename = 'Filename';
	$scope.progress = 0;
	$scope.onDrag = false;


	$scope.changeName = function(){
		$scope.name = 'man';
	}

	$scope.upload = function(file,uuid){
		$scope.Error = null;
		var formData = new FormData();
		formData.append('file',file);
		formData.append('uuid',uuid);
		console.log(formData);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/upload');
		xhr.onload = function() {
			$scope.progress =  100;

			$scope.$apply();
		};


		xhr.upload.onprogress = function (e) {
			if (e.lengthComputable) {
				var complete = (e.loaded / e.total * 100 | 0);
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
		var uuid = s4() + s4() + s4();
		this.name = 'man';

		stopEvent(e);
		var f = e.dataTransfer.files[0];
		var reader = new FileReader();
		$scope.onDrag = false;
		$scope.$apply();
		reader.readAsDataURL(f);
		reader.onload = (function (theFile) {

			return function (e) {
				var src = e.target.result;

				if (src) {
					$scope.path = src;
					$scope.filename = theFile.name;
					console.log(theFile)
					var fileExtension = '.' + theFile.name.split('.').pop();
					$scope.link = 'http://'+ window.location.host + download_folder + uuid+fileExtension;
					console.log($scope.link);
					$scope.$apply();
				}


			};
		})(f);


		if (f.size > 5000000){
			$scope.Error = ' The File you selected is too big. ';
		}
		else{
			$scope.upload(f,uuid);
		}

	}

	$scope.onDragOver = function(e){
		stopEvent(e);
		e.dataTransfer.dropEffect = 'copy';
		$scope.onDrag = true;
		$scope.$apply();
		return false;
	}

	$scope.onDragLeave = function(e){
		stopEvent(e);
		$scope.onDrag = false;
		$scope.$apply();
		return false;
	}

	$scope.onDragStart = function(e){
		stopEvent(e);
		e.dataTransfer.dropEffect = 'copy';
		return false;

	}

	$scope.clearError = function(e){
		$scope.Error = null;
	}

}

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
