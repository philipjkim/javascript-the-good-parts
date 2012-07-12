require('../method');

var add = function(a, b){
  return a + b;
};

exports['functional literal'] = function(test){
  test.same(add(2, 3), 5);
  test.done();
};

var myObject = {
  value: 0,
  increment: function(inc){
    this.value += typeof inc === "number" ? inc : 1;
  }
};

exports['method invocation pattern'] = function(test){
  myObject.increment();
  test.same(myObject.value, 1);
  myObject.increment(2);
  test.same(myObject.value, 3);
  test.done();
};

myObject.double = function(){
  var that = this;

  var helper = function(){
    that.value = add(that.value, that.value);
  };

  helper();
};

exports['function invocation pattern'] = function(test){
  myObject.double();
  test.same(myObject.value, 6);
  test.done();
};

var Quo = function(string){
  this.status = string;
};

Quo.prototype.get_status = function(){
  return this.status;
};

exports['constructor invocation pattern'] = function(test){
  var myQuo = new Quo("confused");
  test.same(myQuo.get_status(), "confused");
  test.done();
};

exports['apply invocation pattern'] = function(test){
  var array = [3, 4];
  var sum = add.apply(null, array);
  test.same(sum, 7);

  var statusObject = {
    status: "A-OK"
  };

  var status = Quo.prototype.get_status.apply(statusObject);
  test.same(status, "A-OK");
  test.done();
};
