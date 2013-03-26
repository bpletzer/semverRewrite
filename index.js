var rewrite = require("connect-url-rewrite");
var connect = require("connect");
var semver = require("semver");

var rules = [
  "^\/example.html /redirected.html"
]

var app = connect()
  .use(function(req, res){
    var version = req.url.slice(1);
    console.log(version, semver.satisfies('2.0.1', version));
  })
  .use(rewrite(rules))
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(function(req, res){
    res.end('hello world\n' + console.dir(req.url));
  })
 .listen(3000);
