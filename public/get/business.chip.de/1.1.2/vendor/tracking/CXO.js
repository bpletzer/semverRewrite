define(['module', 'vendor/core/System', './TrackingSystem'], function(module, System, TrackSys) {
	var CXO = System.inherit(System);

	CXO.extend(CXO, TrackSys);

	//create the tracking pixel
	CXO.img = document.createElement('img');
	CXO.systemId = module.id;

	CXO.track = function() {
		this.img.src = "http://x.chip.de/collect?test=hhaa";
	};

	return CXO;
});