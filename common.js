Function.prototype.method = function(name, func){
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

if (typeof Object.beget !== "function") {
  Object.beget = function(o){
    var F = function(){};
    F.prototype = o;
    return new F();
  };
}

Object.method('superior', function(name){
  var that = this;
  var method = that[name];
  return function(){
    return method.apply(that, arguments);
  };
});
