if(!this.spring){this.spring=function(){var B="undefined",R="test",G="2cnt.net",C=typeof spring_ms!=B?spring_ms:2048,L=typeof spring_debug!=B?spring_debug:null,M={"+":"%2B",",":"%2C",";":"%3B","=":"%3D","~":"%7E"},K="site",I="s",Q={},S=null,N={},F;function H(){if("https"==document.location.href.slice(0,5)){return"https://ssl-"}return"http://"}function O(W,U){if(!U){if(!W){return this}U=W;W={r:document.referrer};N=U}var V=U[I]?U[I]:W[I];if(!V){V=U[K]?U[K]:(W[K]?W[K]:R)}if(!Q[V]){Q[V]=[]}Q[V].push([W,U]);S=1;return this}function D(Z){if(!S){O({})}var X,W,Y,V,U;for(W in Q){if(Q.hasOwnProperty(W)){Y=Q[W];while(Y.length>0){V=",",U=[];while(Y.length>0){V=V+P(T(Y.shift(),U),U);if(V.length>C){break}if(Y.length>0){V+="+"}}X=A(V+";",W,Z)}}}Q={};return X}function A(Y,W,a){var X=H()+(W?W:R)+"."+G+"/j0="+Y,V=X+"?lt="+(new Date()).getTime().toString(36)+"&x="+screen.width+"x"+screen.height+"x"+screen.colorDepth;if(a==1){document.write('<img src="'+V+'" width="1" height="1">')}else{if(a==2){(new Image()).src=V}else{if(a==3||!a){var Z=H()+"i."+G+"/?l="+encodeURIComponent(V);if(!F){F=document.createElement("iframe");var U=F.style;U.position="absolute";U.left=U.top="-999px";F.src=Z;document.body.appendChild(F)}else{F.src=Z}}}}if(L){alert(V)}return X}function P(U,W){for(var V=0;V<W.length;V+=1){if(W[V]==U){return"~"+V}}W.push(U);return U}function T(X,Z){var V,Y,W,U,b=/[+&,;=~]/g,c;if(!Z){Z=[]}switch(typeof X){case"string":return b.test(X)?escape(X).replace(b,function(d){var e=M[d];return e?e:d}):escape(X);case"number":return isFinite(X)?String(X):"null";case"boolean":case"null":return String(X);case"object":if(!X){return"null"}V=[];if(typeof X.length==="number"&&!(X.propertyIsEnumerable("length"))){U=X.length;for(Y=0;Y<U;Y+=1){V.push(P(T(X[Y],Z),Z)||"null")}return","+V.join("+")+";"}for(W in X){if(typeof W==="string"){if(W!=K&&W!=I){c=T(X[W],Z);if(c){V.push(P(T(W,Z)+"="+c,Z))}}}}return","+V.join("+")+";"}return""}function E(V,U,W){O(V,U);return D(W)}function J(){while(springq.length>0){var U=springq.shift();if(U[1]){O(U[0],U[1])}else{O(U,false)}}D();setTimeout("spring.p()",100)}return{a:O,add:O,c:E,commit:E,p:J}}()}if(this.springq){spring.p()};