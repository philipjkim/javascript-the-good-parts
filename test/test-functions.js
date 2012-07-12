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
  var that = this, helper = function(){
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
  var array = [3, 4],
      sum = add.apply(null, array),
      statusObject = {
        status: "A-OK"
      },
      status = Quo.prototype.get_status.apply(statusObject);

  test.same(sum, 7);
  test.same(status, "A-OK");
  test.done();
};

var sum = function(){
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};

exports['arguments'] = function(test){
  test.same(sum(4, 8, 15, 16, 23, 42), 108);
  test.done();
};

var add2 = function(a, b){
  if (typeof a !== "number" || typeof b !== "number") {
    throw {
      name: "TypeError",
      message: "add2 needs numbers"
    };
  }
  return a + b;
};

var try_it = function(){
  try {
    add2("seven");
    return "failed";
  } catch (e) {
    return e.name + ": " + e.message;
  }
};

exports.exceptions = function(test){
  var result = try_it();
  test.same(result, "TypeError: add2 needs numbers");
  test.done();
};
