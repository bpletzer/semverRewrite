define(["jquery"],function(t){(function(t){function e(){var e=window.innerHeight,i=document.compatMode;return(i||!t.support.boxModel)&&(e="CSS1Compat"==i?document.documentElement.clientHeight:document.body.clientHeight),e}t(window).scroll(function(){var i=e(),n=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,o=[];t.each(t.cache,function(){this.events&&this.events.inview&&o.push(this.handle.elem)}),o.length&&t(o).each(function(){var e=t(this),o=e.offset().top,a=e.height(),r=e.data("inview")||!1;n>o+a||o>n+i?r&&(e.data("inview",!1),e.trigger("inview",[!1])):o+a>n&&(r||(e.data("inview",!0),e.trigger("inview",[!0])))})}),t(function(){t(window).scroll()})})(t)});