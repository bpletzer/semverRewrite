define(["require"],function(e){function t(t){var n,r;return i.push(t),n=window,n[t]===void 0&&(n[t]=[]),r=n[t],r.execute=function(){for(var t,n,i,r;this.length>0;)t=this.shift(),n=t[0],i=t[1].replace(/\s/g,""),"function"==typeof i?e(n,i):(r=t.slice(2),-1===n.indexOf("vendor/")&&(n="vendor/"+n),e([n],function(e){e[i].apply(e,r)}))},r.push=function(e){var t=this;Array.prototype.push.call(t,e),t.execute()},r.execute(),this}function n(e){return!(-1===i.indexOf(e))}var i=[];return{create:t,isExisting:n}});