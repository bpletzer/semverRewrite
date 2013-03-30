/**
 * synchonrizes communication between amd and non-amd world
 * 
 */
define(['require'], function (require) {
	var queues = [];

	function create(queueName, scope) {
		var scope, aqueue;

		queues.push(queueName);

		if (!scope) {
			scope = window;
		}

		if ('undefined' === typeof(scope[queueName])) {
			scope[queueName] = [];
		}
		aqueue = scope[queueName];

		aqueue.execute = function () {
			var value, dependency, func, args;

			while (this.length > 0) {
				value = this.shift();
				dependency = value[0];
				func = value[1];

				if ("function" === typeof func) {

					if (! (dependency instanceof Array) ) {
						dependency = [dependency];
					}
					require(dependency, func);
				} else {

					func.replace(/\s/g, ''); //.trim();
					args = value.slice(2);
					if (-1 === dependency.indexOf('vendor/')) {

						dependency = 'vendor/' + dependency;  // HACKFIX: move to vendor, if server-app hasn't yet => only vendor possible right now
					}
					require([dependency], function (dep) {
						dep[func].apply(dep, args);
					});
				}
			}
		};

		aqueue.push = function (value) {
			var that = this;
			Array.prototype.push.call(that, value);
			that.execute();
		};

		aqueue.execute();

		return this;
	}

	function isExisting(queueName){
		return !(queues.indexOf(queueName) === -1);
	}

	return {

		/*
		 * function create (queueName)
		 * creates a named global queue (like _caq) and executes everything pushed to it
		 *
		 * global usage:
		 * window._caq = window._caq || [];
		 * window._caq.push([DEPENDENCY-STRING, COMMAND, ARGUMENTS...]);
		 * window._caq.push([ [DEPENDENCY- ARRAY], FUNCTION]);
		 */
		create:create,
		isExisting: isExisting
	};
});