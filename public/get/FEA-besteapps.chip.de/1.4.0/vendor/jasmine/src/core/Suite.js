jasmine.Suite=function(e,t,n,i){var r=this;r.id=e.nextSuiteId?e.nextSuiteId():null,r.description=t,r.queue=new jasmine.Queue(e),r.parentSuite=i,r.env=e,r.before_=[],r.after_=[],r.children_=[],r.suites_=[],r.specs_=[]},jasmine.Suite.prototype.getFullName=function(){for(var e=this.description,t=this.parentSuite;t;t=t.parentSuite)e=t.description+" "+e;return e},jasmine.Suite.prototype.finish=function(e){this.env.reporter.reportSuiteResults(this),this.finished=!0,"function"==typeof e&&e()},jasmine.Suite.prototype.beforeEach=function(e){e.typeName="beforeEach",this.before_.unshift(e)},jasmine.Suite.prototype.afterEach=function(e){e.typeName="afterEach",this.after_.unshift(e)},jasmine.Suite.prototype.results=function(){return this.queue.results()},jasmine.Suite.prototype.add=function(e){this.children_.push(e),e instanceof jasmine.Suite?(this.suites_.push(e),this.env.currentRunner().addSuite(e)):this.specs_.push(e),this.queue.add(e)},jasmine.Suite.prototype.specs=function(){return this.specs_},jasmine.Suite.prototype.suites=function(){return this.suites_},jasmine.Suite.prototype.children=function(){return this.children_},jasmine.Suite.prototype.execute=function(e){var t=this;this.queue.start(function(){t.finish(e)})};