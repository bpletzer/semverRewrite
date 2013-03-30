define(['require', 'exports', 'module', './TrackingSystem', 'vendor/core/uniqueId'], function(req, exports, module, TrackSys, uniqueId){

	var GoogleAnalytics = TrackSys.inherit(TrackSys);

	GoogleAnalytics.SYSTEM_ID = module.id;

	GoogleAnalytics.pushToGaq = function(trackParams, prefix){
		var i, isArr, val, trackParam;

		for(i in trackParams){
			trackParam = trackParams[i];
			isArr = this.isArray(trackParam);
			if(prefix){
				val = isArr ? trackParam.shift() : trackParams.shift();
				val = isArr ? [prefix + '.' + val].concat(trackParam) : [prefix + '.' + val].concat(trackParams);
			} else {
				val = isArr ? trackParam : trackParams;
			}
			window._gaq.push(val);

			if(!isArr){
				break;
			}
		}
	};

	GoogleAnalytics.initSystemConfig = function(val){
		//set the prefix if its not already set by defaultConfig

		this.prefix = uniqueId.get();

		if(this.isArray(val)){
			this.pushToGaq(val, this.prefix);
		}

		window._gaq.push(['_gat._anonymizeIp']);
	};

	GoogleAnalytics.track_pi = function(){
		this.pushToGaq(['_trackPageview'], this.prefix);
	};

	GoogleAnalytics.setCustomVar = function(val){
		var i;

		for(i=0; i<val.length; i++){
			val[i] = ['_setCustomVar'].concat(val[i]);
		}
		this.pushToGaq(val, this.prefix);
	};

	GoogleAnalytics.trackEvent = function(obj){
		var evtInfo = obj.eventObj;

		this.pushToGaq(['_trackEvent', evtInfo.evtType, evtInfo.evtName, evtInfo.eventProps['prop1'], Math.round(evtInfo.current)], this.prefix);
	}


	return GoogleAnalytics;
});