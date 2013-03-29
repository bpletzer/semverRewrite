var fs = require('fs');
var semver = require("semver");

var versions = function(root){
	
		var folders = fs.readdirSync(root);
		
		folders = folders.filter(function(folder){
			
			return semver.valid(folder);
		})

		return folders;	
	};

module.exports.get = versions;