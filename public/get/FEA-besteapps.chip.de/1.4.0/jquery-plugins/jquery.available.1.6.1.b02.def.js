define(["jquery","requireCSS!jquery-plugins/jquery.fancybox-1.3.4.css"],function(t){var e,i=[],n=0,a=function(e){try{e.multiple?t(e.selector).each(function(){var i=t(this).data();"object"!=typeof i["jquery.available"]&&(i["jquery.available"]={}),i["jquery.available"][e.uuid]||(e.fn.apply(t(this)),i["jquery.available"][e.uuid]=!0)}):e.fn.apply(t(e.selector).eq(0))}catch(i){"undefined"!=typeof console&&console.log(i)}},o=function(e){return t(e.selector)[0]&&(e.turbo||t(e.selector).next()[0]||t.isReady)?!0:!1},r=function(){for(var n=0;i.length>n;n++)o(i[n])&&(a(i[n]),i[n].multiple||(i.splice(n,1),n--));(!i.length||t.isReady)&&(e=clearInterval(e))};t.fn.available=function(s,l,c){var l=l||!1,c=c||!1;n++;var d={selector:this.selector,fn:s,turbo:l,multiple:c,uuid:n};return t.isReady||o(d)&&!c?a(d):(i.push(d),e||(e=setInterval(r,1))),this},t.fn.available.queue=i});