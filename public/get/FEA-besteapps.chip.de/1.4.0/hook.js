(function(t){"use strict";t.config(t.cxo),t(["vendor/core/currpage","vendor/core/annotationsLoader","vendor/core/mediator","vendor/core/queue","jquery","vendor/tracking/Dispatcher","cxo/device_type_userAgent","cxo/system-information","system-warning/system-warning"],function(t,e,n,i,o,a,r,s,c){var l=[],d=s.getViewInfo().type;n.subscribe(function(){l.push([this.name,arguments])}),i.create("_caq"),t.set(chip_currpage_json),t.set("mobile-device",r.getMobileDevice()),t.set("google_prerender",r.getGooglePrerender()),t.set("device_type_userAgent",r.getDeviceType()),t.set("device_type_cssVar",d),a("configs/tracking",l),n.publish("init.core"),c.init(t.get("os_specific_content")),e.init("body"),document.documentElement.hasOwnProperty("ontouchstart")||o(".touch").removeClass("touch").addClass("no-touch")})})(require);