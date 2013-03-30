define(['require', 'vendor/core/mediator', './TrackingSystem', 'vendor/core/System'], function(req, mediator, disp_TrackSystem, disp_System){
	/**
	 *    The Tracking-Dispatcher constructor. Using nested require's to get the configuration given by a string at first.
	 *    Within the callback of the configuration require call the tracking systems given by config. Subscribe a system to its specific
	 *    Tracking-Events.
	 *
	 *  @param {Object} configStr - The config to be required as module_id or url.
	 *  @param {Object} evtQueue - The ref of a queue of events (probably contain events triggered before)
	 */
	var Dispatcher = function(configStr, evt_queue){
		//subscribe all events to handle them in Systems loaded after the event is triggered

		//set the eventQueue to make it accessible from all systems
		disp_System.setEventQueue(evt_queue);		

		req([configStr], function(trackConfig){
			var evt;

			disp_System.extend(disp_TrackSystem, disp_System);
			//cross extending, because the disp_System uses functions of disp_TrackSystem
			//subscribe alle events of global eventMap
			for(evt in trackConfig._eventMap){
				disp_TrackSystem.subscribeEvent(disp_TrackSystem, trackConfig, evt);
			}
		});
	};

	return Dispatcher;

});
