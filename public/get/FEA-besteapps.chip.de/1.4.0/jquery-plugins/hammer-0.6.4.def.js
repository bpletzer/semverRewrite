define(function(){function t(e,n,i){function o(t){return t.touches?t.touches.length:1}function a(t){var e=document,n=e.body;return[{x:t.pageX||t.clientX+(e&&e.scrollLeft||n&&n.scrollLeft||0)-(e&&e.clientLeft||n&&e.clientLeft||0),y:t.pageY||t.clientY+(e&&e.scrollTop||n&&n.scrollTop||0)-(e&&e.clientTop||n&&e.clientTop||0)}]}function r(t){for(var e,i=[],o=0,a=n.two_touch_max?Math.min(2,t.touches.length):t.touches.length;a>o;o++)e=t.touches[o],i.push({x:e.pageX,y:e.pageY});return i}function s(t){var e=a;return t=t||window.event,X?e=r:n.allow_touch_and_mouse&&t.touches!==i&&t.touches.length>0&&(e=r),e(t)}function c(t,e){return 180*Math.atan2(e.y-t.y,e.x-t.x)/Math.PI}function l(t,e){var n=e.x-t.x,i=e.y-t.y;return Math.sqrt(n*n+i*i)}function d(t,e){if(2==t.length&&2==e.length){var n=l(t[0],t[1]),i=l(e[0],e[1]);return i/n}return 0}function u(t,e){if(2==t.length&&2==e.length){var n=c(t[1],t[0]),i=c(e[1],e[0]);return i-n}return 0}function h(t,e){e.touches=s(e.originalEvent),e.type=t,y(x["on"+t])&&x["on"+t].call(x,e)}function p(t){t=t||window.event,t.preventDefault?(t.preventDefault(),t.stopPropagation()):(t.returnValue=!1,t.cancelBubble=!0)}function f(){S={},O=!1,A=0,q=0,I=0,_=null}function g(t){function i(){S.start=s(t),M=(new Date).getTime(),A=o(t),O=!0,C=t;var n=e.getBoundingClientRect(),i=e.clientTop||document.body.clientTop||0,a=e.clientLeft||document.body.clientLeft||0,r=window.pageYOffset||e.scrollTop||document.body.scrollTop,c=window.pageXOffset||e.scrollLeft||document.body.scrollLeft;H={top:n.top+r-i,left:n.left+c-a},z=!0,Y.hold(t)}var a;switch(t.type){case"mousedown":case"touchstart":a=o(t),F=1===a,2===a&&"drag"===_&&h("dragend",{originalEvent:t,direction:D,distance:q,angle:I}),i(),n.prevent_default&&p(t);break;case"mousemove":case"touchmove":if(a=o(t),!z&&1===a)return!1;z||2!==a||(F=!1,f(),i()),k=t,S.move=s(t),Y.transform(t)||Y.drag(t);break;case"mouseup":case"mouseout":case"touchcancel":case"touchend":var r=!0;if(z=!1,T=t,Y.swipe(t),"drag"==_)h("dragend",{originalEvent:t,direction:D,distance:q,angle:I});else if("transform"==_){var c=S.center.x-S.startCenter.x,l=S.center.y-S.startCenter.y;h("transformend",{originalEvent:t,position:S.center,scale:d(S.start,S.move),rotation:u(S.start,S.move),distance:q,distanceX:c,distanceY:l}),1===o(t)&&(f(),i(),r=!1)}else F&&"mouseout"!=t.type&&Y.tap(C);null!==_&&(E=_,h("release",{originalEvent:t,gesture:_,position:S.move||S.start})),r&&f()}}function v(t){m(e,t.relatedTarget)||g(t)}function m(t,e){if(!e&&window.event&&window.event.toElement&&(e=window.event.toElement),t===e)return!0;if(e)for(var n=e.parentNode;null!==n;){if(n===t)return!0;n=n.parentNode}return!1}function b(t,e){var n={};if(!e)return t;for(var i in t)n[i]=i in e?e[i]:t[i];return n}function y(t){return"[object Function]"==Object.prototype.toString.call(t)}function w(t,e,n){e=e.split(" ");for(var i=0,o=e.length;o>i;i++)t.addEventListener?t.addEventListener(e[i],n,!1):document.attachEvent&&t.attachEvent("on"+e[i],n)}var x=this,j=b({prevent_default:!1,css_hacks:!0,swipe:!0,swipe_time:500,swipe_min_distance:20,drag:!0,drag_vertical:!0,drag_horizontal:!0,drag_min_distance:20,transform:!0,scale_treshold:.1,rotation_treshold:15,tap:!0,tap_double:!0,tap_max_interval:300,tap_max_distance:10,tap_double_distance:20,hold:!0,hold_timeout:500,allow_touch_and_mouse:!1},t.defaults||{});n=b(j,n),function(){if(!n.css_hacks)return!1;for(var t=["webkit","moz","ms","o",""],i={userSelect:"none",touchCallout:"none",touchAction:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"},o="",a=0;t.length>a;a++)for(var r in i)o=r,t[a]&&(o=t[a]+o.substring(0,1).toUpperCase()+o.substring(1)),e.style[o]=i[r]}();var C,k,T,q=0,I=0,D=0,S={},A=0,O=!1,_=null,E=null,M=null,P={x:0,y:0},B=null,L=null,H={},z=!1,X="ontouchstart"in window,F=!1;this.option=function(t,e){return e!==i&&(n[t]=e),n[t]},this.getDirectionFromAngle=function(t){var e,n,i={down:t>=45&&135>t,left:t>=135||-135>=t,up:-45>t&&t>-135,right:t>=-45&&45>=t};for(n in i)if(i[n]){e=n;break}return e},this.destroy=function(){(X||n.allow_touch_and_mouse)&&removeEvent(e,"touchstart touchmove touchend touchcancel",g),(!X||n.allow_touch_and_mouse)&&(removeEvent(e,"mouseup mousedown mousemove",g),removeEvent(e,"mouseout",v))};var Y={hold:function(t){n.hold&&(_="hold",clearTimeout(L),L=setTimeout(function(){"hold"==_&&h("hold",{originalEvent:t,position:S.start})},n.hold_timeout))},swipe:function(t){if(S.move&&"transform"!==_){var e=S.move[0].x-S.start[0].x,i=S.move[0].y-S.start[0].y;q=Math.sqrt(e*e+i*i);var o=(new Date).getTime(),a=o-M;if(n.swipe&&n.swipe_time>=a&&q>=n.swipe_min_distance){I=c(S.start[0],S.move[0]),D=x.getDirectionFromAngle(I),_="swipe";var r={x:S.move[0].x-H.left,y:S.move[0].y-H.top},s={originalEvent:t,position:r,direction:D,distance:q,distanceX:e,distanceY:i,angle:I};h("swipe",s)}}},drag:function(t){var e=S.move[0].x-S.start[0].x,i=S.move[0].y-S.start[0].y;if(q=Math.sqrt(e*e+i*i),n.drag&&q>n.drag_min_distance||"drag"==_){I=c(S.start[0],S.move[0]),D=x.getDirectionFromAngle(I);var o="up"==D||"down"==D;if((o&&!n.drag_vertical||!o&&!n.drag_horizontal)&&q>n.drag_min_distance)return;_="drag";var a={x:S.move[0].x-H.left,y:S.move[0].y-H.top},r={originalEvent:t,position:a,direction:D,distance:q,distanceX:e,distanceY:i,angle:I};O&&(h("dragstart",r),O=!1),h("drag",r),p(t)}},transform:function(t){if(n.transform){var e=o(t);if(2!==e)return!1;var i=u(S.start,S.move),a=d(S.start,S.move);if("transform"===_||Math.abs(1-a)>n.scale_treshold||Math.abs(i)>n.rotation_treshold){_="transform",S.center={x:(S.move[0].x+S.move[1].x)/2-H.left,y:(S.move[0].y+S.move[1].y)/2-H.top},O&&(S.startCenter=S.center);var r=S.center.x-S.startCenter.x,s=S.center.y-S.startCenter.y;q=Math.sqrt(r*r+s*s);var c={originalEvent:t,position:S.center,scale:a,rotation:i,distance:q,distanceX:r,distanceY:s};return O&&(h("transformstart",c),O=!1),h("transform",c),p(t),!0}}return!1},tap:function(t){var e=(new Date).getTime(),i=e-M;if(!n.hold||n.hold&&n.hold_timeout>i){var o=function(){if(P&&n.tap_double&&"tap"==E&&S.start&&n.tap_max_interval>M-B){var t=Math.abs(P[0].x-S.start[0].x),e=Math.abs(P[0].y-S.start[0].y);return P&&S.start&&Math.max(t,e)<n.tap_double_distance}return!1}();if(o)_="double_tap",B=null,h("doubletap",{originalEvent:t,position:S.start}),p(t);else{var a=S.move?Math.abs(S.move[0].x-S.start[0].x):0,r=S.move?Math.abs(S.move[0].y-S.start[0].y):0;q=Math.max(a,r),n.tap_max_distance>q&&(_="tap",B=e,P=S.start,n.tap&&(h("tap",{originalEvent:t,position:S.start}),p(t)))}}}};(X||n.allow_touch_and_mouse)&&w(e,"touchstart touchmove touchend touchcancel",g),(!X||n.allow_touch_and_mouse)&&(w(e,"mouseup mousedown mousemove",g),w(e,"mouseout",v))}return t});