define(['require', 'module', './TrackingSystem'], function(require, module, TrackSys){

	var springQ,
		MobileAgof = TrackSys.inherit(TrackSys);

	MobileAgof.SYSTEM_ID = module.id;
	springQ = window.springq = window.springq || [];

	/** Push to Agof (Spring-Queue) this will trigger the tracking pixel
	 *
	 * @param {Object} val - the rendered param.value of the config
	 */
	MobileAgof.track_pi = function(val){
		springQ.push(val);
	};

	return MobileAgof;
});