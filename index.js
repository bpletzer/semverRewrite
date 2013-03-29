// ~ tilde
var connect = require("connect");

var appFolder = __dirname+'/public/get/';

var app = connect()
	.use("/get", require("./filter/semverRewrite")(appFolder))

	.use("/list", require("./versions").list(appFolder))
	
	.use("/active", require("./versions").active(appFolder))
	
	.use("/activate", require("./versions").activate(appFolder))
	
	.use("/deactivate", require("./versions").deactivate(appFolder))

  .use(function(req, res, next){

	console.log(req.url)
    next();
  })	
  .use(connect.static('public'))
  .listen(3000);