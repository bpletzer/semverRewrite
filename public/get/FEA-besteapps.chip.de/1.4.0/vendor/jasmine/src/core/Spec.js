jasmine.Spec=function(e,t,n){if(!e)throw Error("jasmine.Env() required");if(!t)throw Error("jasmine.Suite() required");var i=this;i.id=e.nextSpecId?e.nextSpecId():null,i.env=e,i.suite=t,i.description=n,i.queue=new jasmine.Queue(e),i.afterCallbacks=[],i.spies_=[],i.results_=new jasmine.NestedResults,i.results_.description=n,i.matchersClass=null},jasmine.Spec.prototype.getFullName=function(){return this.suite.getFullName()+" "+this.description+"."},jasmine.Spec.prototype.results=function(){return this.results_},jasmine.Spec.prototype.log=function(){return this.results_.log(arguments)},jasmine.Spec.prototype.runs=function(e){var t=new jasmine.Block(this.env,e,this);return this.addToQueue(t),this},jasmine.Spec.prototype.addToQueue=function(e){this.queue.isRunning()?this.queue.insertNext(e):this.queue.add(e)},jasmine.Spec.prototype.addMatcherResult=function(e){this.results_.addResult(e)},jasmine.Spec.prototype.expect=function(e){var t=new(this.getMatchersClass_())(this.env,e,this);return t.not=new(this.getMatchersClass_())(this.env,e,this,!0),t},jasmine.Spec.prototype.waits=function(e){var t=new jasmine.WaitsBlock(this.env,e,this);return this.addToQueue(t),this},jasmine.Spec.prototype.waitsFor=function(){for(var e=null,t=null,n=null,i=0;arguments.length>i;i++){var r=arguments[i];switch(typeof r){case"function":e=r;break;case"string":t=r;break;case"number":n=r}}var o=new jasmine.WaitsForBlock(this.env,n,e,t,this);return this.addToQueue(o),this},jasmine.Spec.prototype.fail=function(e){var t=new jasmine.ExpectationResult({passed:!1,message:e?jasmine.util.formatException(e):"Exception",trace:{stack:e.stack}});this.results_.addResult(t)},jasmine.Spec.prototype.getMatchersClass_=function(){return this.matchersClass||this.env.matchersClass},jasmine.Spec.prototype.addMatchers=function(e){var t=this.getMatchersClass_(),n=function(){t.apply(this,arguments)};jasmine.util.inherit(n,t),jasmine.Matchers.wrapInto_(e,n),this.matchersClass=n},jasmine.Spec.prototype.finishCallback=function(){this.env.reporter.reportSpecResults(this)},jasmine.Spec.prototype.finish=function(e){this.removeAllSpies(),this.finishCallback(),e&&e()},jasmine.Spec.prototype.after=function(e){this.queue.isRunning()?this.queue.add(new jasmine.Block(this.env,e,this),!0):this.afterCallbacks.unshift(e)},jasmine.Spec.prototype.execute=function(e){var t=this;return t.env.specFilter(t)?(this.env.reporter.reportSpecStarting(this),t.env.currentSpec=t,t.addBeforesAndAftersToQueue(),t.queue.start(function(){t.finish(e)}),void 0):(t.results_.skipped=!0,t.finish(e),void 0)},jasmine.Spec.prototype.addBeforesAndAftersToQueue=function(){for(var e,t=this.env.currentRunner(),n=this.suite;n;n=n.parentSuite)for(e=0;n.before_.length>e;e++)this.queue.addBefore(new jasmine.Block(this.env,n.before_[e],this));for(e=0;t.before_.length>e;e++)this.queue.addBefore(new jasmine.Block(this.env,t.before_[e],this));for(e=0;this.afterCallbacks.length>e;e++)this.queue.add(new jasmine.Block(this.env,this.afterCallbacks[e],this),!0);for(n=this.suite;n;n=n.parentSuite)for(e=0;n.after_.length>e;e++)this.queue.add(new jasmine.Block(this.env,n.after_[e],this),!0);for(e=0;t.after_.length>e;e++)this.queue.add(new jasmine.Block(this.env,t.after_[e],this),!0)},jasmine.Spec.prototype.explodes=function(){throw"explodes function should not have been called"},jasmine.Spec.prototype.spyOn=function(e,t,n){if(e==jasmine.undefined)throw"spyOn could not find an object to spy upon for "+t+"()";if(!n&&e[t]===jasmine.undefined)throw t+"() method does not exist";if(!n&&e[t]&&e[t].isSpy)throw Error(t+" has already been spied upon");var i=jasmine.createSpy(t);return this.spies_.push(i),i.baseObj=e,i.methodName=t,i.originalValue=e[t],e[t]=i,i},jasmine.Spec.prototype.removeAllSpies=function(){for(var e=0;this.spies_.length>e;e++){var t=this.spies_[e];t.baseObj[t.methodName]=t.originalValue}this.spies_=[]};