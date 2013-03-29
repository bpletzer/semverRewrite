// ~ tilde
var connect = require("connect");

var app = connect()
  .use("/get", require("./filter/semverRewrite")(__dirname+'/public/get/'))

  .use(function(req, res, next){

	console.log(req.url)
    next();
  })	
  .use(connect.static('public'))
  .listen(3000);