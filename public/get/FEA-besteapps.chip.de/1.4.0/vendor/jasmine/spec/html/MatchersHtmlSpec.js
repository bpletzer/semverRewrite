describe("MatchersSpec - HTML Dependent",function(){function e(e){return i.expect(e)}function t(){return i.addMatcherResult.mostRecentCall.args[0]}var n,i;beforeEach(function(){n=new jasmine.Env,n.updateInterval=0,n.describe("suite",function(){i=n.it("spec",function(){})}),spyOn(i,"addMatcherResult"),this.addMatchers({toPass:function(){return t().passed()},toFail:function(){return!t().passed()}})}),it("toEqual with DOM nodes",function(){var t=document.createElement("div"),n=document.createElement("div");expect(e(t).toEqual(t)).toPass(),expect(e(t).toEqual(n)).toFail()})});