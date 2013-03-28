var fs = require('fs');

var versions = function(root){

		return fs.readdirSync(root);		
	};

module.exports.get = versions;