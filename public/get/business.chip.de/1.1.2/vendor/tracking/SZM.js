define(['module', './TrackingSystem'], function(module, TrackSys){

	var Ivw = TrackSys.inherit(TrackSys),
		queue = [];

	Ivw.SYSTEM_ID = module.id;

	function iomC (item){
		window.iom.c.apply(window.iom, item);
	};

	require(['http://script.ioam.de/iam.js'], function(){

		while(queue.length){
			iomC(queue.shift());
		}

		queue.push = iomC;
	});

	/** Set the image src and track the PI
	 *
	 * @param {Object} val - the rendered param.value of the config
	 */
	Ivw.track_pi = function(val){

        queue.push([{
            "st":this.render("{{szm}}", val),
            "cp":this.render("{{kat}}", val)
        },1]);
	};

	return Ivw;
});
