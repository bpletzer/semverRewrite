define(["jquery","vendor/core/mediator","vendor/core/annotationsLoader"],function(t,e,n){"use strict";function i(e){return this.id=Math.round(1e3*Math.random()),this.$list=null,this.options=t.extend({},f,e),this}function o(i,h){function f(){e.publish("expanded.do.infinite-list",i),i.addClass(g),u(w).done(function(r){r=t("<div />").append(r),y.replaceWith(a(r,b)),h.$list||(h.$list=s(i,v)),h.$list.append(n.init(s(r,v).children())),o(i,h),e.publish("expanded.on.infinite-list",i)}).always(function(){i.removeClass(g)}),i.hasClass(p.class_expanded)||i.addClass(p.class_expanded)}var p=h.options,g=p.class_loading,v=p.selector_list,m=p.selector_next,b=p.selector_paging,y=a(i,b),w=r(y,m);w&&(c(y)?f():l(h.id,function(){c(y)&&(d(h.id),f())}))}function a(e,n){return t(n,e||t(document.body))}function r(e,n){return t(n,e||t(document.body)).attr("href")}function s(e,n){return t(n,e||t(document.body))}function c(t){return h.height()+h.scrollTop()>t.position().top}function l(t,e){h.on("scroll.infinite."+t,e)}function d(t){h.off("scroll.infinite."+t)}function u(e){return t.ajax({url:e+"?ac=1",dataType:"html"})}var h=t(window),f={class_expanded:"expanded",class_loading:"loading",selector_list:".infinite-list",selector_next:".next a",selector_paging:".pagina_wrapper"};return{init:function(e,n){o(t(e),new i(n))}}});