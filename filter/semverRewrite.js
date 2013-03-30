var semver = require("semver");
var versions = require("../versions");

var semverRewrite = function (assetRoot) {
	console.dir(assetRoot)
	
	return function(req, res, next){
		
		console.dir(req.url)
		
		var folder = req.url.split('/');
		var range = folder[2];
		
		var vers = versions.get(assetRoot+folder[1]).sort(semver.compare);

		var version = semver.maxSatisfying(vers, range);

		if (!version) {
			version = vers[vers.length-1]
		}	

		req.url = req.url.replace(range, version);

		next();
	  };
};

module.exports = semverRewrite;