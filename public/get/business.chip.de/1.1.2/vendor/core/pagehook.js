define(['jquery','config','require'], function($,config,require) {
	return {

		cleanUpName: function(name) {
			var lowerCaseName,
				nameWithHypen;

			if(name && name.length > 0) {
				lowerCaseName = name.toLowerCase();
				nameWithHypen = lowerCaseName.replace(/_/g, "-");
			} else {
				nameWithHypen = "";
			}

			return nameWithHypen;
		},

		init: function(articleTypeName) {

			var cleanTypeName = this.cleanUpName(articleTypeName);
			var articleMatch = null;
			var pageList = [];
			var filePath = '';

			if( config.module &&
				config.module.pageHook &&
				config.module.pageHook.pageList &&
				config.module.pageHook.pageFilePath
			) {
				pageList = config.module.pageHook.pageList;
				filePath = config.module.pageHook.pageFilePath;
			}

			articleMatch = $.inArray(cleanTypeName,pageList);

			if(articleMatch) {
				// load page js
				// TODO: use local require
				require([filePath+cleanTypeName], function () {

				}, function (err) {
					console.log('not found page js');
				});
			}

		}
	};
});