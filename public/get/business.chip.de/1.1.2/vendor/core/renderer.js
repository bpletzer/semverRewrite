define(['vendor/mustache/mustache'], function(mustache){

	var test = Object.prototype.toString,

	isArray = function(val) {
		return test.call(val) === '[object Array]';
	},

	isFunction = function(val) {
		return test.call(val) === '[object Function]';
	},

	isString = function(val){
		return typeof val === 'string';
	},

	isObject = function(val){
		return typeof val === 'object';
	},

	render = function(tmpl, obj, key){

		var fullFilledParam,
			i,
			tmp;

		if(typeof tmpl === 'string') {

			fullFilledParam = mustache.render(tmpl, obj);

		} else if(isArray(tmpl)) { //GoogleAnalytics Array Mapping tmpl is Array at this moment

			for(i=0; i < tmpl.length ; i += 1){
				tmpl[i] = this.render(tmpl[i], obj);
			}
			fullFilledParam = tmpl;

		} else if(isFunction(tmpl)) { //if tmpl is a function add the function to its searched object / add render as well to use it within the added function

			//key from config pool
			fullFilledParam = tmpl.call(this, obj);

		} else if(isObject(tmpl)) {

			//render recursive if tmpl is an object
			for(i in tmpl){
				tmpl[i] = this.render(tmpl[i], obj);
			}

			fullFilledParam = tmpl;

		} else {

			fullFilledParam = tmpl;

		}

		return fullFilledParam;
	};

	return {
		isString : isString,
		isArray : isArray,
		isFunction : isFunction,
		isObject: isObject,
		render : render
	};

});