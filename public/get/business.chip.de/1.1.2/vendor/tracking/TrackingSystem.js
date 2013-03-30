define(['require', 'vendor/core/currpage', 'vendor/core/mediator'], function(req, currpage, mediator) {

	var	SYSTEMSCONFIG = {},

	loadTrackSystem = function(sysConfig, systemId){
		req(['require', sysConfig.system_req_id], function(req, trackSystem){
			var evt;
			trackSystem.setSystemConfig(sysConfig);
			for(evt in sysConfig._eventMap){
				trackSystem.subscribeEvent(trackSystem, sysConfig, evt);
			}
			mediator.publish('system.' + systemId + '.init');
		});
	}

	loadTrackSystems = function(systems){
		var systemId;

		SYSTEMSCONFIG = systems;

		for(systemId in systems){
			(function(systemId){
				loadTrackSystem(systems[systemId], systemId);
			})(systemId);
		}
	}
    
    return {
		loadTrackSystems: loadTrackSystems
    };
});
