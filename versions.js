var fs = require('fs');
var semver = require("semver");

var versions = function(root){
	
		var folders = fs.readdirSync(root);
		
		folders = folders.filter(function(folder){
			
			return semver.valid(folder);
		})

		return folders;	
	};
	
var list = function(root) {
	
	return function(req, res){
	
		var app = req.url.split('/')[1];
	
		res.end(versions(root+app).toString())
	}
}

var active = function(root) {
	
	return function(req, res){
	
		var app = req.url.split('/')[1];
		var active = JSON.parse(fs.readFileSync(root+app+'/active.json'));
	
		res.end(active.toString())
	}
}

var activate = function (root) {
	
	return function(req, res){
	
		var app = req.url.split('/')[1];
		var version = req.url.split('/')[2];
		var active = JSON.parse(fs.readFileSync(root+app+'/active.json'));
		var found = false;
		
		active.forEach(function(v){
			if (v === version) found = true;
		})
		
		if (!found) {
			active.push(version);
			fs.writeFile(root+app+'/active.json', JSON.stringify(active));
		}
	
		res.end(active.toString())
	}
}

var deactivate = function (root) {
	
	return function(req, res){
	
		var app = req.url.split('/')[1];
		var version = req.url.split('/')[2];
		var active = JSON.parse(fs.readFileSync(root+app+'/active.json'));
		
		active = active.filter(function(v){
			
			return (v !== version);
		})
		
		fs.writeFile(root+app+'/active.json', JSON.stringify(active));
	
		res.end(active.toString())
	}
}

module.exports.get = versions;
module.exports.list = list;
module.exports.active = active;
module.exports.activate = activate;
module.exports.deactivate = deactivate;