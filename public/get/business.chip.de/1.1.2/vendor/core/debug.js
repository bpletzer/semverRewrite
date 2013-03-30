define([], function () {

	var debug = {
		log : function (module, message, state) {

			var backgroundColor = '#111111';
			var output = '';

			switch (state) {
				case 'OK':
					backgroundColor = '#9FC569';
				break;
				case 'ERROR':
					backgroundColor = '#ED7A53';
				break;
				case 'INFO':
					backgroundColor = '#111111';
				break;
				default:
					backgroundColor = '#111111';
				break;
			}

			console.log('%c' + '  OK  ' + '%c' + ' ' + '%c' + '  ' + module + '  ' + '%c' + '   ' + message,
				'background: ' + backgroundColor + '; color: #FFFFFF',
				'background: #FFFFFF;',
				'background: #88BBC8; color: #FFFFFF',
				'background: #FFFFFF;');
			}
	};
	return debug;
});