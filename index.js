// ~ tilde

var rewrite = require("connect-url-rewrite");
var connect = require("connect");
var semver = require("semver");

var rules = [
  //"^\/example.html /redirected.html"
]

var deployed = [
		'1.0.0',
		'1.0.1',
		'1.1.0',
		'2.0.0'
	];

var app = connect()
  .use(function(req, res, next){

	var version = req.url.split('/')[1];
	console.log('valid version: ' + semver.valid(version), 'valid range: ' + semver.validRange(version))
    
	var index = deployed.length - 1;
	for (index; index>=0; index--){
		if (semver.satisfies(deployed[index], version)) {
			break;
		}
	} 
	
	if (index === -1) {
		index = deployed.length -1;
	}
	console.log(index)
	console.log(deployed[index])
	
	rules.push("^/"+version+" /"+deployed[index]);
	
	next();
  })
  .use(rewrite(rules))
  .use(function(req, res, next){
	console.dir(rules)
	console.log(req.url)
    next();
  })	
  .use(connect.static('public'))
  .listen(3000);