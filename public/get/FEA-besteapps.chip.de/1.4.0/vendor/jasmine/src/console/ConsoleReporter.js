jasmine.ConsoleReporter=function(e,t,n){function i(e,t){return n?j[e]+t+j.none:t}function r(e){return i("green",e)}function s(e){return i("red",e)}function o(e){return i("yellow",e)}function a(){e("\n")}function c(){e("Started"),a()}function l(){e(r("."))}function u(){e(s("F"))}function d(){e(o("*"))}function p(e,t){return 1==t?e:e+"s"}function f(e,t){for(var n=[],i=0;t>i;i++)n.push(e);return n}function h(e,t){for(var n=(e||"").split("\n"),i=[],r=0;n.length>r;r++)i.push(f(" ",t).join("")+n[r]);return i.join("\n")}function m(t,n,i){a(),e(t+" "+n),a();for(var r=0;i.length>r;r++)e(h(i[r],2)),a()}function g(t){a(),e("Finished in "+t/1e3+" seconds")}function v(t,n,i){a(),e(t(n+" "+p(_.spec,n)+", "+i+" "+p(_.failure,i))),a(),a()}function y(e,t){v(r,e,t)}function b(e,t){v(s,e,t)}function x(e){var t=e.description;return e.parentSuite&&(t=x(e.parentSuite)+" "+t),t}function w(e,t){for(var n=0;e.length>n;n++)for(var i=e[n],r=0;i.failedSpecResults.length>r;r++){for(var s=i.failedSpecResults[r],o=[],a=0;s.items_.length>a;a++)o.push(s.items_[a].trace.stack);t(i.description,s.description,o)}}t=t||function(){};var j={green:"[32m",red:"[31m",yellow:"[33m",none:"[0m"},_={spec:"spec",failure:"failure"};this.now=function(){return(new Date).getTime()},this.reportRunnerStarting=function(){this.runnerStartTime=this.now(),c()},this.reportSpecStarting=function(){},this.reportSpecResults=function(e){var t=e.results();t.skipped?d():t.passed()?l():u()},this.suiteResults=[],this.reportSuiteResults=function(e){var t={description:x(e),failedSpecResults:[]};e.results().items_.forEach(function(e){e.failedCount>0&&e.description&&t.failedSpecResults.push(e)}),this.suiteResults.push(t)},this.reportRunnerResults=function(e){a(),w(this.suiteResults,function(e,t,n){m(e,t,n)}),g(this.now()-this.runnerStartTime);var n=e.results(),i=0===n.failedCount?y:b;i(e.specs().length,n.failedCount),t(e)}};