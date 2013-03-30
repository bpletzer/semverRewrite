(function(root, factory){

	var currpage = factory(),
	//NAME = 'core/currpage',
		DEPENDENCIES = ['jquery'];

	if ('function' === typeof define && define.amd) {
		define(DEPENDENCIES, factory);
	}

})( this, function ($) {

	var currpage = {}, json = {};

	currpage.get = function (key) {
		if(key) {
			return json[key];
		} else {
			return json;
		}
	};

	currpage.set = function (key, value) {
		if("object" === typeof key) {
			json = key;
		} else {
			json[key] = value;
		}

		return this;
	};

	/**
	 * @param {Object} event
	 * @param {Object} eventConfig
	 */
	currpage.map = function (eventConfig) {

		var merged = null;
		if( typeof eventConfig !== 'undefined') {
			if(typeof currpage.get('event') === 'undefined') {
				merged = $.extend({}, currpage.get(), {
					event : eventConfig
				});
				return merged;
			}
		}
	};

	return currpage;
});