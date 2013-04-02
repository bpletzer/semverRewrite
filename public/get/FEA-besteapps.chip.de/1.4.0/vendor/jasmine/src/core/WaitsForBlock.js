jasmine.WaitsForBlock=function(e,t,n,i,r){this.timeout=t||e.defaultTimeoutInterval,this.latchFunction=n,this.message=i,this.totalTimeSpentWaitingForLatch=0,jasmine.Block.call(this,e,null,r)},jasmine.util.inherit(jasmine.WaitsForBlock,jasmine.Block),jasmine.WaitsForBlock.TIMEOUT_INCREMENT=10,jasmine.WaitsForBlock.prototype.execute=function(e){jasmine.VERBOSE&&this.env.reporter.log(">> Jasmine waiting for "+(this.message||"something to happen"));var t;try{t=this.latchFunction.apply(this.spec)}catch(n){return this.spec.fail(n),e(),void 0}if(t)e();else if(this.totalTimeSpentWaitingForLatch>=this.timeout){var i="timed out after "+this.timeout+" msec waiting for "+(this.message||"something to happen");this.spec.fail({name:"timeout",message:i}),this.abort=!0,e()}else{this.totalTimeSpentWaitingForLatch+=jasmine.WaitsForBlock.TIMEOUT_INCREMENT;var r=this;this.env.setTimeout(function(){r.execute(e)},jasmine.WaitsForBlock.TIMEOUT_INCREMENT)}};