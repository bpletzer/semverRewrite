define(["jquery","vendor/core/currpage","cxo/system-information","vendor/core/mediator","chip.tooltip","chip.dialog"],function(t,e,n,i,o){"use strict";function a(e){return(e.indexOf("iphone")>-1||e.indexOf("ipad")>-1)&&(e="ios"),t("[data-href_"+e+"]").each(function(){var n=t(this),i=n.data("href_"+e);i&&n.attr("href",i)})}function r(e){require(["chip.dialog"],function(n){var o=n.create({modal:!0},t(e)).open();i.subscribe("change.do.operatingsystem",function(){o.close(),d.qtip("show"),setTimeout(function(){d.qtip("hide")},2500)}),l(o.getMarkup())})}function s(t){return a(t),n.setSessionInfo({os:t}),c(t),i.publish("change.on.operatingsystem",t),t}function c(e){t("body").removeClass(function(t,e){return(e.match(/\bpageos-\S+/g)||[]).join(" ")}).addClass("pageos-"+e)}function l(e){function n(){return i.publish("change.do.operatingsystem",t(this).data("os")),!0}var o=e||t("body");return t(".js-os_switcher[data-os]",o).off("click.osSwitcher").on("click.osSwitcher",n)}var d;return{init:function(u){var h=l();d=t("header nav.switcher").filter(function(){return t(this).is(":visible")}),d.length>0&&o.init(d,{position:{my:"top right",at:"bottom right",adjust:{x:parseInt(d.css("margin-right"),0),y:10}}}),i.subscribe("change.do.operatingsystem",function(t){s(t)}),t.when(n.getSystemInfo(),n.getSessionInfo()).done(function(i,o){var s=u||e.get("os_specific_content"),l=(i.os||"").toLowerCase(),d=o.os;h.length>0&&(d?1>t("#osWarningDialog").length?(a(o.os||d),c(o.os||d)):n.setSessionInfo({os:s}):"android"===l||"ios"===l?s!==l?t("#osWarningDialog").length>0?r("#osWarningDialog"):(n.setSessionInfo({os:l}),a(o.os||l),c(o.os||l)):n.setSessionInfo({os:l}):"android"!==l&&"ios"!==l&&r("#osSelectionDialog"))})}}});