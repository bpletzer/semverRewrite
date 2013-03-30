define(['module', './TrackingSystem', 'jquery'], function(module, TrackSys, jquery){

	var vInsight = TrackSys.inherit(TrackSys);

	vInsight.SYSTEM_ID = module.id;

	/** Set tracking parameters and call 'track' function of vinsight library
	 *
	 * @param {Object} val - the rendered param.value of the config
	 */
	vInsight.track_pi = function(){
		window.VALITON_WA.track();
	};

	vInsight.track = function(val) {
		window.wa_queue.push(['track', val]);
	};

	vInsight.set = function(val){
		window.VALITON_WA.setProp({
			section_1: val.section_1
		});
	};

	vInsight.trackEvent = function(queue_id){
		window.VALITON_WA.push(['track', this[queue_id]]);
	};

	jquery(document).ready(function flushAdEvents(){
		setTimeout(function(){
			//window.wa_queue.push(['setProp', {}]);

			if(vInsight['load']){
				window.wa_queue.push(['track', {
					module: 'ad',
					event: 'load',
					ads: vInsight['load']
				}]);
			}

			if(vInsight['view']){
				window.wa_queue.push(['track', {
					module: 'ad',
					event: 'view',
					ads: vInsight['view']
				}]);
			}
		}, 1000);
	});

	vInsight.collect = function(queue_id){
		var obj = arguments[1].eventObj[0] || arguments[1].eventObj;
		this[queue_id] = this[queue_id] || [];
		this[queue_id].push(obj);
	}

	return vInsight;
});