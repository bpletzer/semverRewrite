define(function(){

	var uniqueCounter=10000;

	return {
		get: function(){
			uniqueCounter = uniqueCounter + 1;
			return (+new Date).toString(36) + uniqueCounter.toString(36);
		}
	};

});