define(['module', './TrackingSystem'], function(module, TrackSys){

	var Ivw = TrackSys.inherit(TrackSys);

	Ivw.SYSTEM_ID = module.id;

	//create the tracking pixel
	Ivw.img = document.createElement('img');


	/** Set the image src and track the PI
	 *
	 * @param {Object} val - the rendered param.value of the config
	 */
	Ivw.track_pi = function(val){
		val.tpl = this.render("http://{{url}}/cgi-bin/ivw/{{typ}}/{{kat}};?r={{ref}}&d={{ran}}", val);
		this.img.src = val.tpl;
	};

	return Ivw;
});