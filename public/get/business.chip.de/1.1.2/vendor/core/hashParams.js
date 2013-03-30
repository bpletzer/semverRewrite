(function(factory){

	if ('function' === typeof define && define.amd) {
		define(function(){return factory();});
	}

})(function(){
	return function () {
		var params = {},
			hashStr = window.location.hash,
			hashArray,
			keyVal;

		hashStr = hashStr.substring(1, hashStr.length);
		hashArray = hashStr.split('&');

		for(var i = 0; i < hashArray.length; i++) {
			keyVal = hashArray[i].split('=');
			params[unescape(keyVal[0])] = (typeof keyVal[1] != 'undefined') ? unescape(keyVal[1]) : null;
		}

		return params;
	};

});