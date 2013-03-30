define(['./annotationsLoader',
	'jquery',
	'vendor/jquery-plugins/jquery.inview.def'], function (annotationsLoader, $) {

	var exports = {
		init:function (elem, eventType, module) {

			$(elem).one(eventType, function () {
				$(elem).attr('data-module', module);

				require([module], function (mod) {
					mod.init.apply(mod, [elem]);
				});
			});
		}
	};

	return exports;

});