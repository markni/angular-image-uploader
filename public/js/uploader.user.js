// ==UserScript==
// @name           bangumi image uploader plugin
// @namespace      com.ruocaled.bangumi
// @description    A simple image uploder for bgm.tv group/subject discussion thread, powered by nagi.ca
// @include        http://bgm.tv/rakuen/*
// @include        http://bangumi.tv/rakuen/*
// @include        http://chii.in/rakuen/*

// ==/UserScript==

var buttonContainer = document.getElementById('submitBtnO');
var uploadContainer = document.createElement("div");
uploadContainer.style.position  = "relative";
uploadContainer.style.display  = "inline";
uploadContainer.style.marginLeft  = "10px";


var fake_upload_button = document.createElement("input");
fake_upload_button.type = 'button';
fake_upload_button.className = 'inputBtn';
fake_upload_button.value = '上传图片';

var upload_button = document.createElement("input");
upload_button.type = 'file';
upload_button.style.opacity = 0;
upload_button.style.zIndex = 2;
upload_button.style.position = "absolute";
upload_button.style.top = "-10px";
upload_button.style.left = 0;
upload_button.style.width = "85px";
upload_button.style.height = "35px";
upload_button.accept = 'image/*';


var file_name = document.createElement('h4');
file_name.style.marginTop = '10px';
file_name.style.height = '12px';
file_name.style.display = 'none';


var url_input = document.createElement("input");
url_input.type = 'text';
url_input.style.display = 'block';
url_input.style.marginTop = '10px';
url_input.style.width = '400px';
url_input.style.display = 'none';

var progress = document.createElement('div');
progress.style.height = '5px';
progress.style.width = '400px';
progress.style.marginTop = '20px';
progress.style.display = 'none';

var bar = document.createElement('div');
bar.style.backgroundColor = '#09F';
bar.style.width ="30%";
bar.style.height = '5px';


progress.appendChild(bar);

uploadContainer.appendChild(fake_upload_button);
uploadContainer.appendChild(upload_button);

buttonContainer.insertBefore(uploadContainer, buttonContainer.children[0].nextSibling);

buttonContainer.appendChild(file_name);
buttonContainer.appendChild(url_input);
buttonContainer.appendChild(progress);


function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
};


function nagi_upload (file,uuid){
	var formData = new FormData();
	formData.append('file',file);
	formData.append('uuid',uuid);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://nagi.ca/upload');
	xhr.onload = function() {
		bar.style.width =  '100%';

	};


	xhr.upload.onprogress = function (e) {
		if (e.lengthComputable) {
			var complete = (e.loaded / e.total * 100 | 0);
			bar.style.width = complete + '%';
		}
	}

	xhr.send(formData);
}



upload_button.onchange = function(e) {
	var f = this.files[0];
	var uuid = s4() + s4() + s4();

	file_name.style.display = 'block';
	progress.style.display = 'block';
	url_input.style.display = 'block';

	var reader = new FileReader();
	reader.readAsDataURL(f);
	reader.onload = (function (theFile) {

		return function (e) {
			var src = e.target.result;

			if (src) {
				file_name.innerText = theFile.name;
				var fileExtension = '.' + theFile.name.split('.').pop();
				var link = 'http://nagi.ca/u/' + uuid+fileExtension;
				url_input.value = '[img]' + link + '[/img]';
				console.log(link);
			}
		};
	})(f);

	if (f.size > 5000000){
		url_input.value = '好~好大~这么大的⋯⋯不行的啦⋯⋯';
	}
	else{
		nagi_upload(f,uuid);
	}

}



