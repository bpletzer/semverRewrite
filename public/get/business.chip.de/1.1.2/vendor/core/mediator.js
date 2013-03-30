/**
 * Mediator: Interface module to let other Modules 
 * communicate via publish/subscribe functions. (Wrapped in UMD-Pattern)
 *
 * @version 1.0
 */
(function(root, factory){

	define(['jquery'], factory);

}(this, function($){

	var core = {},
		evtSubscriberMap = {},
		testStr = Object.prototype.toString,

		isFunction = function (it) {
			return testStr.call(it) === '[object Function]';
		},

		/**
		 * This function will be bind/unbind to an specific event
		 *
		 * @param {Object} e - the event object
		 */
		eventHandler = function (e) {

			var args = Array.prototype.slice.call(arguments, 1),
				eventName = args.shift();

			if(typeof args[0] !== 'undefined'){
				args[0] = args[0] || {};
				args[0]['evtName'] = e.type;
				args[0]['evtType'] = e.namespace;
				args[0]['evtTimeStamp'] = e.timeStamp;
			}

			e.data.func.apply({
				name: eventName || e.type + '.' + e.namespace
			}, args);
		},

		/**
		 * Subscribe to all possible events if required
		 *
		 * @param {Object} func
		 */
		subscribeToAll = function (func) {
			$(core).bind('*', {func: func}, eventHandler);
		},

		/**
		 * This function allows to subscribe to a specific or all events
		 *
		 * @param {Object} evt - event that have to be bound to a handler
		 * @param {Object} func - called if the event handler is executed by triggering the event
		 */
		subscribe = function (evt, func) {

			if(typeof evt === 'string' && isFunction(func)){
				$(core).bind(evt, {func: func}, eventHandler);

			}else if(isFunction(evt)){
				subscribeToAll(evt); //evt = func to call
			}else{
				throw new Error('core/mediator -> subscribe: wrong parameters');
			}

		},

		/**
		 * Unsubscribe from all possible events if required
		 *
		 */
		unsubscribeFromAll = function () {
			$(core).unbind('*', eventHandler);
		},

		/**
		 * This function allows to unsubscribe from a specific or all events
		 *
		 * @param {Object} evt - event that have to be unbound from the handler
		 */
		unsubscribe = function (evt) {
			if(typeof evt === 'string' && isFunction(func)){
				$(core).unbind(evt, eventHandler);

			}else if(isFunction(evt)){
				unsubscribeFromAll(evt);

			}else{
				throw new Error('core/mediator -> unsubscribe: wrong parameters');
			}

		},

		/**
		 * Publish an event to trigger its handler function.
		 *
		 * @param {Object} evt
		 */
		publish = function (evt) {
			var args = Array.prototype.slice.call(arguments, 1);

			args.unshift(evt);
			$(core).trigger(evt, args);
			$(core).trigger('*', args);
		};

	//expose
	return {
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		evtSubscriberMap: evtSubscriberMap
	};
})); //IIFE END
