/*
 * data-module-group collects all elements of one widget 
 * and load that widget module only once giving it those elements
 *
 * <div
 *      data-module="modA"
 *      data-module-attributes="a,b"
 *		data-module-css="a.css"
 * />
 * 
 * => 
 * require(['modA', 'css!a.css'], function(modA){
 * 	modA.init( NODE, 'a', 'b');	
 * })
 *
 */
define(['require', 'jquery'], function (require, $){

	var exports = {},
		module = 'module',
		css = module+'-css',
		parameters = module+'-parameters';

	exports.init = function (context) {

		$("[data-"+module+"]", context).each(function () {

			var elem = this,
				$item = $(elem),
				mod = $item.data(module),
				cssOffset = $item.data(css),
				params = $item.data(parameters) || '',
				dependencies = [mod];

			$(elem)
				.attr({
            		'data-module-loaded' : require.toUrl(mod),
        		})
				.removeAttr('data-module')

			if (cssOffset) {
				dependencies.push('vendor/r.plugins/css/css!'+cssOffset);
			}

			require(dependencies, function (mod) {
				if ("string" === typeof mod) {
					$item.html(mod);
					exports.init(elem);
				} else {
					mod.init.apply(mod, [elem].concat( params.split(',') ) );
				}

				$(elem).show();
			});

		});
	};

	return exports;
});