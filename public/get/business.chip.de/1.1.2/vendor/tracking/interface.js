define(["vendor/jQuery/custom", 'vendor/T-Lite/wrapper'], function ($, tlite) {

  var output = function () {};

  output.render = function () {
    return tlite.find(this.params.tpl, this.params);
  };

  output.set = function (key, value) {
    this.params[key] = value;

    return this;
  };

  output.mapCurrpage = function (currpage, map) {
    // todo: alle mapping in einzelnen Klassen-Module
    /*
    var config = {},
      key, k, c;

    for (key in map) {
      if ("string" === typeof(map[key])) {
        this.set(key, tlite.find(map[key], currpage));
      } else if (map[key] instanceof Array) {
        c = map[key];
        for (k in c) {
          if ("string" === typeof c[k]) {
            c[k] = tlite.find(c[k], currpage);
          }
        }
        this.set(key, c);
      }
    }
    */
    return this;
  };

  output.track = function () {
    this.params.ran = (+new Date).toString(36);
    this.img.src = this.render();

    return this;
  };

  output.extend = function (config) {
    // todo: aug-library durch jQuery.extend abgelöst
    $.extend(this.params, config);

    return this;
  };

  return output;
});
