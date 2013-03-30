(function (root, factory) {
	var dependencies = ['./mediator'];
	define(dependencies, factory);
}(this, function (mediator) {

	var htmlQueue = {},
		queue = [],
		retrieveQueue = [];

	function stripScripts (s) {
		var div = document.createElement('div');
		div.innerHTML = s;
		var scripts = div.getElementsByTagName('script');
		var i = scripts.length;
		while (i--) {
			scripts[i].parentNode.removeChild(scripts[i]);
		}
		return div.innerHTML;
	}

	htmlQueue.shift = function(){
		var func = queue.shift();
		if (func){
			func.apply(window);
		}
	};

	htmlQueue.push = function (func, id, system) {
		queue.push(func);

		retrieveObj = {
			zoneId: id,
			system: system
		};

		retrieveQueue.push(retrieveObj);
	};

	htmlQueue.retrieve = function () {
		var obj = retrieveQueue.shift(),
			scripts = document.getElementsByTagName( 'script' ),
			thisScriptTag = scripts[ scripts.length - 1 ],
			parentNode = thisScriptTag.parentNode;

		if(obj && obj.zoneId){
				document.getElementById(obj.zoneId).innerHTML = parentNode.innerHTML;
				if(obj.system){
					if(!obj.system.hasAdContent(document.getElementById(obj.zoneId))) { //TODO: normally not !obj.system... #MM
						mediator.publish('system.emptyzone', obj);
					}
				}
		}

		parentNode.innerHTML = '';
	};

	htmlQueue.dir = function () {
		console.dir(queue);
	};

	return htmlQueue;
}));