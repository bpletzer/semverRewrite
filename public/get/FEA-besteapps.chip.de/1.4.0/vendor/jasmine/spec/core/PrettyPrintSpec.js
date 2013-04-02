describe("jasmine.pp",function(){it("should wrap strings in single quotes",function(){expect(jasmine.pp("some string")).toEqual("'some string'"),expect(jasmine.pp("som' string")).toEqual("'som' string'")}),it("should stringify primitives properly",function(){expect(jasmine.pp(!0)).toEqual("true"),expect(jasmine.pp(!1)).toEqual("false"),expect(jasmine.pp(null)).toEqual("null"),expect(jasmine.pp(jasmine.undefined)).toEqual("undefined"),expect(jasmine.pp(3)).toEqual("3"),expect(jasmine.pp(-3.14)).toEqual("-3.14")}),it("should stringify arrays properly",function(){expect(jasmine.pp([1,2])).toEqual("[ 1, 2 ]"),expect(jasmine.pp([1,"foo",{},jasmine.undefined,null])).toEqual("[ 1, 'foo', {  }, undefined, null ]")}),it("should indicate circular array references",function(){var e=[1,2],t=[e];e.push(t),expect(jasmine.pp(e)).toEqual("[ 1, 2, [ <circular reference: Array> ] ]")}),it("should stringify objects properly",function(){expect(jasmine.pp({foo:"bar"})).toEqual("{ foo : 'bar' }"),expect(jasmine.pp({foo:"bar",baz:3,nullValue:null,undefinedValue:jasmine.undefined})).toEqual("{ foo : 'bar', baz : 3, nullValue : null, undefinedValue : undefined }"),expect(jasmine.pp({foo:function(){},bar:[1,2,3]})).toEqual("{ foo : Function, bar : [ 1, 2, 3 ] }")}),it("should not include inherited properties when stringifying an object",function(){var e=function(){};e.prototype.foo="inherited foo";var t=new e;t.bar="my own bar",expect(jasmine.pp(t)).toEqual("{ bar : 'my own bar' }")}),it("should not recurse objects and arrays more deeply than jasmine.MAX_PRETTY_PRINT_DEPTH",function(){var e=jasmine.MAX_PRETTY_PRINT_DEPTH,t={level1:{level2:{level3:{level4:"leaf"}}}},n=[1,[2,[3,[4,"leaf"]]]];try{jasmine.MAX_PRETTY_PRINT_DEPTH=2,expect(jasmine.pp(t)).toEqual("{ level1 : { level2 : Object } }"),expect(jasmine.pp(n)).toEqual("[ 1, [ 2, Array ] ]"),jasmine.MAX_PRETTY_PRINT_DEPTH=3,expect(jasmine.pp(t)).toEqual("{ level1 : { level2 : { level3 : Object } } }"),expect(jasmine.pp(n)).toEqual("[ 1, [ 2, [ 3, Array ] ] ]"),jasmine.MAX_PRETTY_PRINT_DEPTH=4,expect(jasmine.pp(t)).toEqual("{ level1 : { level2 : { level3 : { level4 : 'leaf' } } } }"),expect(jasmine.pp(n)).toEqual("[ 1, [ 2, [ 3, [ 4, 'leaf' ] ] ] ]")}finally{jasmine.MAX_PRETTY_PRINT_DEPTH=e}}),it("should stringify RegExp objects properly",function(){expect(jasmine.pp(/x|y|z/)).toEqual("/x|y|z/")}),it("should indicate circular object references",function(){var e={foo:"hello"};e.nested=e,expect(jasmine.pp(e)).toEqual("{ foo : 'hello', nested : <circular reference: Object> }")}),it("should indicate getters on objects as such",function(){var e={id:1};e.__defineGetter__&&e.__defineGetter__("calculatedValue",function(){throw Error("don't call me!")}),e.__defineGetter__?expect(jasmine.pp(e)).toEqual("{ id : 1, calculatedValue : <getter> }"):expect(jasmine.pp(e)).toEqual("{ id : 1 }")}),it("should not do HTML escaping of strings",function(){expect(jasmine.pp("some <b>html string</b> &",!1)).toEqual("'some <b>html string</b> &'")}),it("should abbreviate the global (usually window) object",function(){expect(jasmine.pp(jasmine.getGlobal())).toEqual("<global>")}),it("should stringify Date objects properly",function(){var e=new Date;expect(jasmine.pp(e)).toEqual("Date("+(""+e)+")")}),it("should stringify spy objects properly",function(){var e={someFunction:function(){}};spyOn(e,"someFunction"),expect(jasmine.pp(e.someFunction)).toEqual("spy on someFunction"),expect(jasmine.pp(jasmine.createSpy("something"))).toEqual("spy on something")}),it("should stringify objects that implement jasmineToString",function(){var e={jasmineToString:function(){return"strung"}};expect(jasmine.pp(e)).toEqual("strung")})});