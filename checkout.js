var spawn = require("./lib/spawn.js");
var fs = require('fs');

spawn('rm', ['-Rf', 'temp/cloned']).on('close', function(){

	spawn('git', ['clone', 'ssh://git@git/FE/fea-besteapps.chip.de.git', 'temp/cloned']).on('close', function(){

		spawn('git', ['checkout', 'tags/1.4.0'], {cwd:__dirname+'/temp/cloned'}).on('close', function(){

			var app = JSON.parse(fs.readFileSync(__dirname+'/temp/cloned/component.json')).name;

			spawn('mv', ['temp/cloned/dist', 'public/get/'+app+'/1.4.0'], {cwd:__dirname}).on('close', function(){

			})	
		})
	})
})