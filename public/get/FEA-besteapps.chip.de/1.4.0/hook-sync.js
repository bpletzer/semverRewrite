(function(t,e){function n(t,e){var n;for(n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}var i;n(e.paths,{trigger:"vendor/blockingLoader/trigger"}),i=t.config(n({context:"blocking"},e)),i(["vendor/advertisement/AdController","vendor/core/mediator","vendor/core/currpage","vendor/core/htmlQueue","vendor/core/queue","vendor/core/hashParams","jquery"],function(t,e,n,i,o,a){var r;o.create("_cbq"),n.set(chip_currpage_json),r=a().enableAD,(r||null===r)&&t.init(),e.publish("init.sync"),window.onorientationchange=function(t){t={Event:t,Orientation:window.orientation},e.publish("orientationchange",t)}})})(require,require.cxo);