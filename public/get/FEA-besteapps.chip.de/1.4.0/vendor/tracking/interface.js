define(["vendor/jQuery/custom","vendor/T-Lite/wrapper"],function(e,t){var n=function(){};return n.render=function(){return t.find(this.params.tpl,this.params)},n.set=function(e,t){return this.params[e]=t,this},n.mapCurrpage=function(){return this},n.track=function(){return this.params.ran=(+new Date).toString(36),this.img.src=this.render(),this},n.extend=function(t){return e.extend(this.params,t),this},n});