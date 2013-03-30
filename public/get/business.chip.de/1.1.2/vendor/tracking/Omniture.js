define(['require', 'exports', 'module', './TrackingSystem', './omniture_somtr_code-H.24.3'], function(req, exports, module, TrackSys, somtr){
	//get the external library
	/*req(['http://extrenal.Library'], function(){


	 });*/
	var Omniture = TrackSys.inherit(TrackSys);

	Omniture.SYSTEM_ID = module.id;

	Omniture.initSystemConfig = function(config){
		this.somtr = somtr(config.s_account);
	};

	Omniture.set = function(config){
		var i, length, field;

		length = config.length;

		for(i = 0; i < length; i++){
			field = config[i];
			this.somtr[field[0]] = field[1];
		}

	};

	Omniture.track_pi = function(){
		this.somtr.t();
	};

	Omniture.trackEvent = function(obj){

		var evtInfo = obj.eventObj,
			title = evtInfo.eventProps['prop1'],
			type = evtInfo.evtType.split('.'),
			typeL = type.length;

		type = type[typeL - 1];

		if(type === 'video'){

			current = evtInfo.current;
			if(evtInfo.evtName === "load"){
				this.somtr.Media.open(title, evtInfo.length, evtInfo.eventProps.prop3);
			}
			if(evtInfo.evtName === "start"){
				this.somtr.Media.l[title].l = Math.round(evtInfo.length);
				this.somtr.Media.play(title, parseInt(current));
			}
			if(evtInfo.evtName === "play"){
				this.somtr.Media.play(title, parseInt(current));
			}
			if(evtInfo.evtName === "stop"){
				this.somtr.Media.stop(title, parseInt(current));
			}
			if(evtInfo.evtName === "pause"){
				this.somtr.Media.stop(title, parseInt(current));
			}
			if(evtInfo.evtName === "resume"){
				this.somtr.Media.play(title, parseInt(current));
			}

			if(evtInfo.evtName === "seek"){
				this.somtr.Media.play(title, parseInt(current));
			}
			if(evtInfo.evtName === "finish"){
				this.somtr.Media.stop(title, parseInt(current));
				//omniture.s.Media.complete(title, parseInt(current));
				//omniture.s.Media.close(title, parseInt(current));//in onbefore load vielleicht   :S
				this.somtr.Media.close(title);
			}

		}

	}

	return Omniture;
});