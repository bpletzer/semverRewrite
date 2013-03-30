define(['require', 'vendor/core/currpage', 'vendor/core/renderer', 'vendor/core/mediator'], function(req, currpage, renderer, mediator){

	var EVT_QUEUE,
		FILTER_SEPERATOR = '|',
		ERROR_NO_FUNCTION = function(id, call, err){
			this.name = 'NoFunctionFoundError';
			this.message = id + ': the function #-' + call + '-# probably fails or is not implemented yet. - '+err;
		},

		/**
		 * Function <b>inherit</b> will set the prototype of a System object to the given parent object and will instantiate
		 * a new System object. (prototypal Inheritance)
		 *
		 * @param parent Object to set to the prototype of the new System object
		 * @return {System}
		 */
		inherit = function(parent){
			function System(){}
			System.prototype = parent;
			return new System();
		},

		/**
		 * This function will allow you to extend object through other objects by merging key values into each other.
		 *
		 * @param t The Object TO extend
		 * @param f The Object extend FROM
		 */
		extend = function(t, f){
			var key;
			if(f){
				for(key in f){
					if(f.hasOwnProperty(key)){
						t[key] = f[key];
					}
				}
			}
		},

		/**
		 * <b>isAvailable</b> searches for a given string within an array or array of objects.
		 *
		 * @param id The string to search for within an array, or array of objects.
		 * @param arr The array or array of objects to search
		 */
		isAvailable = function(id, arr){
			var i, item, ret = false;
			for(i in arr){
				if(arr.hasOwnProperty(i)){
					if(renderer.isArray(arr[i])){
						ret = isAvailable(id, arr[i]);
						if(ret){
							break;
						}
					}else if(arr[i] === id){
						ret = true;
						break;
					}else{
						for(item in arr[i]){
							if(arr[i][item] === id){
								ret = true;//isAvailable(id, arr[i]);
								break;
							}
						}
					}
				}
			}
			return ret;
		},

		/**
		 * This function extends the window object with a given globals object.
		 * @param globals The object that should extend the window object.
		 */
		initGlobals = function(globals){
			this.extend(window, globals);
		},

		/**
		 * Function <b>loadLibrary</b> allows you to load a library for specific system.
		 *
		 * @param libraryObjArr Object or Array with the url to
		 */
		loadLibrary = function(libraryObjArr){
			var i,
				_func = function(library){
					req([library.url], function(obj){
						mediator.publish(library.eventName, obj);
					});
				};

			if(this.isArray(libraryObjArr)){
				for(i = 0; i < libraryObjArr.length; i += 1){
					_func(libraryObjArr[i]);
				}
			}else if(this.isObject(libraryObjArr)){
				req([libraryObjArr.url], function(obj){
					mediator.publish(libraryObjArr.eventName, obj);
				});
			}
		},

		/**
		 * This function lets you set function- and parameter filters for configuration purposes.
		 * A system will hold system specific- and global filters within the FILTERS object.
		 *
		 * @param filters The object of filters (primarily functions)
		 */
		setFilters = function(filters){

			if(!this.SYSTEM_ID){
				this.GLOBALFILTERS = filters;
				this.FILTERS = filters;
			}else{
				this.extend(filters, this.GLOBALFILTERS);
				this.FILTERS = filters;
			}
		},

		/**
		 * <b>subscribeEvent</b> will let systems subscribe for events triggered by core/mediator.
		 * The function <b>handleEvent</b> will always be executed if one of the events is triggered.
		 *
		 * @param system The system which subscribes the event
		 * @param sysConfig    The configuration given by the site
		 * @param evtName The name of the event which should be subscribed
		 */
		subscribeEvent = function(system, sysConfig, evtName){
			var alreadyFiredEvent, i;

			if(this.isArray(EVT_QUEUE)){
				for(i = 0; i < EVT_QUEUE.length; i += 1){
					alreadyFiredEvent = EVT_QUEUE[i];
					if(evtName === alreadyFiredEvent[0]){
						handleEvent(alreadyFiredEvent[1], system, sysConfig, alreadyFiredEvent[0]);
					}
				}
			}

			mediator.subscribe(evtName, function(eventObj){
				handleEvent(eventObj, system, sysConfig, evtName);
			});
		},


		/**
		 * <b>subscribeExternalEvents</b> is used if an event or events could be fired by another component
		 * (e.g a videoplayer or a gallery) before the whole system (e.g. including libraries) is loaded
		 * and all internal system events are triggered.
		 *
		 * @param evts Object of events which should be subscribed
		 */
		subscribeExternalEvents = function(evts){

			var evt;
			this.extend(this.SYSTEMCONFIG._eventMap, evts);
			for(evt in evts){
				if(evts.hasOwnProperty(evt)){
					this.subscribeEvent(this, this.SYSTEMCONFIG, evt);
				}
			}
		},

		/**
		 * <b>execFilters</b> will execute all filters out of the filterPrefArr through filter functions
		 * integrated within the given system before.
		 *
		 * @param filterPrefArr An array of prefixed filters.
		 * @param sysFilters The available FILTERS(+GLOBALFILTERS) of the system.
		 * @param system A system itself. It will be the 'this' within a filter function.
		 * @param renderObj An object that will be a parameter of the filter.
		 *
		 * @return result The aggregated result of all filters. Can be true or false.
		 */
		execFilters = function(filterPrefArr, sysFilters, system, renderObj){

			var i, filterRes,
				result = true;

			for(i = 0; i < filterPrefArr.length; i += 1){
				if(sysFilters[filterPrefArr[i]] && system.isFunction(sysFilters[filterPrefArr[i]])){
					filterRes = sysFilters[filterPrefArr[i]].call(system, renderObj);
					if(result !== filterRes){
						result = filterRes;
						break;
					}
				}
			}
			return result;
		},

		/**
		 * This function will analyse the parameters given to the 'configured function'.
		 * If there are filter prefixes within object keys they will be executed and parameters will be
		 * edited by deletion or renaming before they are given to the  'configured function'.
		 *
		 * @param system A system object
		 * @param params The params which have to be filtered perhaps.
		 * @param renderObj An object that will be a parameter of the filter.
		 */
		execSubParamFilters = function(system, params, renderObj){
			var i, iSplLength, iSplit, filtersResult, filters, wasFilterd;
			if(system.isObject(params)){
				for(i in params){
					if(params.hasOwnProperty(i)){
						iSplit = i.split('|');
						filters = [];
						wasFilterd = false;
						filtersResult = true;

						if(iSplit.length > 1){
							extractFilters(iSplit, filters);
							filtersResult = execFilters(filters, system.FILTERS, system, renderObj);
							wasFilterd = true;
						}
						if(!filtersResult){
							delete(params[i]);
						}else{
							if(wasFilterd){
								iSplLength = iSplit.length - 1;
								params[iSplit[iSplLength]] = params[i];
								delete(params[i]);
								execSubParamFilters(system, params[iSplit[iSplLength]], renderObj);
							}else{
								execSubParamFilters(system, params[i], renderObj);
							}
						}
					}
				}
			}
			return params;
		},

		/**
		 * <b>extractFilters</b> analyses a split (by FILTER_SEPERATOR) string (an Array) for filters
		 * and push their ids to an array. The last entry of the split array is the function or parameter name itself.
		 *
		 * @param strSplit The string split by FILTER_SEPERATOR
		 * @param filters An array to be filled with filter ids
		 *
		 * @return The final function or parameter name
		 */
		extractFilters = function(strSplit, filters){
			var strSplitLength, i, isRendered,
				specialFilter = '!render';


			strSplitLength = strSplit.length;
			if(strSplitLength > 1){
				for(i = 0; i < strSplitLength - 1; i += 1){ //last itme will be the function call itself
					if(specialFilter === strSplit[i]){
						isRendered = false;
					}else{
						filters.push(strSplit[i]);
					}
				}
			}
			return strSplit[strSplitLength - 1];
		},

		/**
		 * <b>execEventHandler</b>
		 *
		 * @param evtHandler
		 * @param system
		 * @param sysConfig
		 * @param renderObj
		 */
		execEventHandler = function(evtHandler, system, sysConfig, renderObj){
			var i, funcCall, funcCallSplit,
				funcParams, funcParam, funcParamSplit,
				func_filters,
				param_filters,
				isParamToBeRendered,
				funcParamsObjects,
				paramFiltersResult = true,
				filtersResult = true,
				tmp = evtHandler.split('(');

			funcCall = tmp[0];
			funcCallSplit = funcCall.split(FILTER_SEPERATOR);
			funcParams = tmp[1] ? tmp[1].slice(0, -1) : '';
			funcParams = funcParams.replace(/\s/g, '').split(',');
			func_filters = [];
			param_filters = [];

			if(funcCallSplit.length > 1){
				funcCall = extractFilters(funcCallSplit, func_filters);
			}

			if(func_filters.length > 0){ //if there are filters to this function execute them
				filtersResult = execFilters(func_filters, system.FILTERS, system, renderObj);
			}

			if(system.isArray(funcParams)){
				if(true === filtersResult){ //default is true, if on filter returns false it will be false;
					funcParamsObjects = [];
					for(i = 0; i < funcParams.length; i += 1){
						isParamToBeRendered = true;
						funcParam = funcParams[i];
						param_filters = [];
						funcParamSplit = funcParam.split(FILTER_SEPERATOR);

						if(funcParamSplit.length > 1){
							isParamToBeRendered = extractFilters(funcParamSplit, param_filters);
							funcParam = funcParamSplit[funcParamSplit.length - 1];
						}

						if(param_filters.length > 0){
							paramFiltersResult = execFilters(param_filters, system.FILTERS, system, renderObj);
						}

						if(true === paramFiltersResult && sysConfig.params[funcParam]){
							funcParam = sysConfig.params[funcParam];
							funcParam = execSubParamFilters(system, funcParam, renderObj);
							if(true === isParamToBeRendered){
								funcParam = system.render(funcParam, renderObj);
							}
							funcParamsObjects.push(funcParam);
						}
					}

					funcParamsObjects.push(renderObj);
					try{
						system[funcCall].apply(system, funcParamsObjects);
					}catch(e){
						throw new ERROR_NO_FUNCTION(system.SYSTEM_ID, funcCall, e);
					}
				}
			}
		},

		/**
		 * <b>handleEvent</b>
		 *
		 * @param eventObj
		 * @param system
		 * @param sysConfig
		 * @param evtName
		 */
		handleEvent = function(eventObj, system, sysConfig, evtName){
			var i,

				renderObj = {
					currpage: system.getCurrpage(),
					eventObj: eventObj,
					params: sysConfig.params
					//system : system
				};

			if(system.isArray(sysConfig._eventMap[evtName])){
				for(i = 0; i < sysConfig._eventMap[evtName].length; i += 1){
					execEventHandler(sysConfig._eventMap[evtName][i], system, sysConfig, renderObj);
				}

			}else if(system.isString(sysConfig._eventMap[evtName])){
				execEventHandler(sysConfig._eventMap[evtName], system, sysConfig, renderObj);

			}else if(system.isFunction(sysConfig._eventMap[evtName])){
				sysConfig._eventMap[evtName].apply(system, [renderObj, evtName]);
			}
		},

		/**
		 * References the external evt_queue to EVT_QUEUE for internal use.
		 *
		 * @param evt_queue Array of events triggered before
		 */
		setEventQueue = function(evt_queue){
			EVT_QUEUE = evt_queue || [];
		},

		/**
		 * <b>setSystemConfig</b> sets the Configuration of the system into the system itself.
		 *
		 * @param sysCfg The system specific Configuration part of the main Configuration
		 */
		setSystemConfig = function(sysCfg){
			this.SYSTEMCONFIG = sysCfg;
		};

	ERROR_NO_FUNCTION.prototype = Error.prototype;

	return {
		SYSTEM_ID: null,
		inherit: inherit,
		isArray: renderer.isArray,
		isFunction: renderer.isFunction,
		isString: renderer.isString,
		isObject: renderer.isObject,
		isAvailable: isAvailable,
		extend: extend,
		render: renderer.render,
		loadLibrary: loadLibrary,
		setSystemConfig: setSystemConfig,
		subscribeEvent: subscribeEvent,
		subscribeExternalEvents: subscribeExternalEvents,
		handleEvent: handleEvent,
		getCurrpage: currpage.get,
		initGlobals: initGlobals,
		setFilters: setFilters,
		setEventQueue: setEventQueue
	};

});
