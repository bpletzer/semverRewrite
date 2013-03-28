// ~ tilde
var connect = require("connect");
var semver = require("semver");
var versions = require("./versions");

var app = connect()
  .use('/praxistipps.chip.de', function(req, res, next){

	var range = req.url.split('/')[1];
	var vers = versions.get(__dirname+'/public/praxistipps.chip.de').sort(semver.compare);
	var version = semver.maxSatisfying(vers, range);
	
	if (!version) {
		version = vers[vers.length-1]
	}	
	
	req.url = req.url.replace(range, version);
	
	next();
  })

  .use(function(req, res, next){

	console.log(req.url)
    next();
  })	
  .use(connect.static('public'))
  .listen(3000);