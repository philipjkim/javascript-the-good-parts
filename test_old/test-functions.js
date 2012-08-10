require('../common');
var _ = require('underscore.string');

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

exports['augmenting types'] = function(test){
  test.throws(
    function(){
      (-10 /3).integer();
    },
    TypeError
  );
  Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
  });
  test.same((-10 / 3).integer(), -3);

  String.method('trim', function(){
    return this.replace(/^\s+|\s+$/g, '');
  });
  test.same('"' + "   neat   ".trim() + '"', '"neat"');
  test.done();
};

exports.recursion = function(test){
  var actual = [],
    expected = [ 'Move disc 1 from Src to Dst',
      'Move disc 2 from Src to Aux',
      'Move disc 1 from Dst to Aux',
      'Move disc 3 from Src to Dst',
      'Move disc 1 from Aux to Src',
      'Move disc 2 from Aux to Dst',
      'Move disc 1 from Src to Dst' ],
    hanoi = function(disc, src, aux, dst){
      if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        var result = _.sprintf("Move disc %d from %s to %s", disc, src, dst);
        actual.push(result);
        hanoi(disc - 1, aux, src, dst);
      }
    },
    factorial = function factorial(i, a){
      a = a || 1;
      if (i < 2) {
        return a;
      }
      return factorial(i - 1, a * i);
    };

  hanoi(3, 'Src', 'Aux', 'Dst');
  test.same(actual, expected);

  test.same(factorial(5), 120);
  test.done();
};

exports.scope = function(test){
  var foo = function(){
    var a = 3, b = 5, c = 0, bar = function(){
      var b = 7, c = 11;
      test.same(a, 3);
      test.same(b, 7);
      test.same(c, 11);
      a += b + c;
      test.same(a, 21);
      test.same(b, 7);
      test.same(c, 11);
    };
    test.same(a, 3);
    test.same(b, 5);
    test.same(c, 0);
    bar();
    test.same(a, 21);
    test.same(b, 5);
    test.same(c, 0);
  };
  test.done();
};

exports.closure = function(test){
  var quo = function(status){
    return {
      get_status: function(){
        return status;
      }
    };
  }, myQuo = quo("amazed");
  test.same(myQuo.get_status(), "amazed");
  test.done();
};

exports.module = function(test){
  String.method('deentityfy', (function(){
    var entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };
    return function(){
      return this.replace(/&([^&;]+);/g,
        function(a, b){
          var r = entity[b];
          return typeof r === 'string' ? r : a;
        }
      );
    };
  }())); 
  test.same('&lt;value=&quot;unknown&quot;&gt;'.deentityfy(),
            '<value="unknown">');

  var serialMaker = (function(){
    var prefix = '', seq = 0;
    return {
      setPrefix: function(p){
        prefix = String(p);
      },
      setSeq: function(s){
        seq = s;
      },
      generate: function(){
        var result = prefix + seq;
        seq += 1;
        return result;
      }
    };
  }());
  serialMaker.setPrefix('Q');
  serialMaker.setSeq(1000);
  test.same(serialMaker.generate(), "Q1000");
  test.done();
};

exports.curry = function(test){
  Function.method('curry', function(){
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function(){
      return that.apply(null, args.concat(slice.apply(arguments)));
    };
  });
  var add1 = add.curry(1);
  test.same(add1(6), 7);
  test.done();
};

exports.memoization = function(test){
  var called = 0,
      i = 0,
      expected = [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ],
      fibonacci = function(n){
        called += 1;
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      },
      memoizer = function(memo, fundamental){
        var shell = function(n){
          called += 1;
          var result = memo[n];
          if (typeof result !== 'number'){
            result = fundamental(shell, n);
            memo[n] = result;
          }
          return result;
        };
        return shell;
      },
      fibonacciMemoized = memoizer([0, 1], function(shell, n){
        return shell(n - 1) + shell(n - 2);
      });

  for (i = 0; i <= 10; i += 1){
    test.same(fibonacci(i), expected[i]);
  }
  test.same(called, 453);

  called = 0;
  for (i = 0; i <= 10; i += 1){
    test.same(fibonacciMemoized(i), expected[i]);
  }
  test.same(called, 29);
  test.done();
};