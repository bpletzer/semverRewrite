// ~ tilde

var rewrite = require("connect-url-rewrite");
var connect = require("connect");
var semver = require("semver");

var rules = [
  "^\/example.html /redirected.html"
]

var deployed = [
		'1.0.0',
		'1.0.1',
		'1.1.0',
		'2.0.0'
	];

var app = connect()
  .use('/praxis', function(req, res, next){

	var range = req.url.split('/')[1];
	var version = semver.maxSatisfying(deployed, range);
	
	if (!version) {
		version = deployed[deployed.length-1]
	}
	
	console.log('range ', range, 'version ', version)
	
	rules.push("^/praxis/"+range+"/hook.js /"+version);
	
	next();
  })
  .use(rewrite(rules))
  .use(function(req, res, next){
	console.dir(rules)
	console.dir(req.url)
    next();
  })	
  .use(connect.static('public'))
  .listen(3000);