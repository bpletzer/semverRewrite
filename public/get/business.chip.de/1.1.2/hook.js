(function(storage){

    var baseUrl = 'http://www.chip.de/fec/business.chip.de/1.1.2/';

    if (storage && storage.base) {
        baseUrl = storage.base;
    }

    require.config({
        baseUrl: baseUrl,

        paths: {
            'jquery': 'vendor/jquery/jquery',
            'fanconverter': 'vendor/fanconverter/fanconverter'
        }
    });

    require(['require', 'vendor/core/mediator', 'vendor/core/annotationsLoader', 'vendor/core/currpage', 'vendor/core/queue'],
        function(require, mediator, annotationsLoader, currpage, queue) {

            var evt_queue = [];

            mediator.subscribe(function() {
                evt_queue.push([this.name, arguments]);
            });

            currpage.set(chip_currpage_json);

            queue.create('_caq');

            mediator.publish("init.core");

            annotationsLoader.init("body");
        }
    );

})(window.storage);
