var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partial = function (req, res) {
  var name = req.params.name;
  res.render('partials/partial' + name);
};

exports.upload = function (req, res) {

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

	if (req.files){
		console.log(req.files);
		fs.readFile(req.files.file.path, function (err, data) {
			var fileExtension = '.'+ req.files.file.name.split('.').pop();
			var newPath = './public/u/'+hash(req.files.file.name)+fileExtension;
			console.log(newPath);
			fs.writeFile(newPath, data, function (err) {
				if (err) console.log(err);
				res.render('index');
			});
		});
	}
	else
	{
		res.render('index');
	}



};