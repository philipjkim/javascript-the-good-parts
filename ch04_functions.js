require('./method');

// 4.2. Functional Literal

var add = function(a, b){
  return a + b;
};
console.log("add(1, 2) = " + add(1, 2));

// 4.3. Invocation

// 4.3.1. The Method Invocation Pattern

var myObject = {
  value: 0,
  increment: function(inc){
    this.value += typeof inc === "number" ? inc : 1;
  }
};
myObject.increment();
console.log("myObject.value after increment() = " + myObject.value);
myObject.increment(2);
console.log("myObject.value after increment(2) = " + myObject.value);

// 4.3.2. The Function Invocation Pattern

myObject.double = function(){
  var that = this;

  var helper = function(){
    that.value = add(that.value, that.value);
  };

  helper();
};
myObject.double();
console.log("myObject.value after double() = " + myObject.value);

// 4.3.3. The Constructor Invocation Pattern

var Quo = function(string){
  this.status = string;
};

Quo.prototype.get_status = function(){
  return this.status;
};

var myQuo = new Quo("confused");
console.log("myQuo.get_status() = " + myQuo.get_status());

// 4.3.4. The Apply Invocation Pattern

var array = [3, 4];
var sum = add.apply(null, array);
console.log("add.apply(null, [3,4]) = " + sum);

var statusObject = {
  status: "A-OK"
};

var status = Quo.prototype.get_status.apply(statusObject);
console.log("Quo.prototype.get_status.apply(statusObject) = " + status);
