// ~ tilde
var connect = require("connect");
var semver = require("semver");

var deployed = [
		'1.0.0',
		'1.0.1',
		'1.1.0',
		'2.0.0'
	];

var app = connect()
  .use('/praxistipps.chip.de', function(req, res, next){

	var range = req.url.split('/')[1];
	var version = semver.maxSatisfying(deployed, range);
	
	if (!version) {
		version = deployed[deployed.length-1]
	}
	
	console.log('range ', range, 'validRange', semver.validRange(range), 'version ', version)
	
	req.url = req.url.replace(range, version);
	//rules.push("^/praxis/"+range+"/hook.js /"+version);
	
	next();
  })

  .use(function(req, res, next){
	console.dir(req.url)
    next();
  })	
  .use(connect.static('public'))
  .listen(3000);