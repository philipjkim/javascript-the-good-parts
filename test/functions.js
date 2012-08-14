require('../common');
var _ = require('underscore.string');
var should = require('should');

describe('function', function() {
  var add = function(a, b){
    return a + b;
  };

  it('should return the value as expected', function() {
    add(2, 3).should.equal(5);
  });

  var myObject = {
    value: 0,
    increment: function(inc){
      this.value += typeof inc === "number" ? inc : 1;
    }
  };

  it('should work via method invocation pattern', function() {
    myObject.increment();
    myObject.value.should.equal(1);
    myObject.increment(2);
    myObject.value.should.equal(3);
  });

  myObject.double = function(){
    var that = this, helper = function(){
      that.value = add(that.value, that.value);
    };

    helper();
  };

  it('should work via function invocation pattern', function() {
    myObject.double();
    myObject.value.should.equal(6);
  });

  var Quo = function(string){
    this.status = string;
  };

  Quo.prototype.get_status = function(){
    return this.status;
  };

  it('should work via constructor invocation pattern', function() {
    var myQuo = new Quo("confused");
    myQuo.get_status().should.equal("confused");
  });

  it('should work via apply invocation pattern', function() {
    var array = [3, 4];
    var sum = add.apply(null, array);
    var statusObject = {
        status: "A-OK"
    };
    var status = Quo.prototype.get_status.apply(statusObject);

    sum.should.equal(7);
    status.should.equal("A-OK");
  });

  var sum = function(){
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
      sum += arguments[i];
    }
    return sum;
  };

  it('should take multiple arguments as an array', function() {
    sum(4, 8, 15, 16, 23, 42).should.equal(108);
  });

  var add2 = function(a, b){
    if (typeof a !== "number" || typeof b !== "number") {
      throw {
        name: "TypeError",
        message: "add2 needs numbers"
      };
    }
    return a + b;
  };

  it('should throw an error when the condition is met', function() {
    add2.should.throwError();
  });

  it('should be augmented to any type as a method', function() {
    Number.method('integer', function(){
      return Math[this < 0 ? 'ceil' : 'floor'](this);
    });
    (-10 / 3).integer().should.equal(-3);

    String.method('trim', function(){
      return this.replace(/^\s+|\s+$/g, '');
    });
    ('"' + "   neat   ".trim() + '"').should.equal('"neat"');
  });

  it('should be recursive if wanted', function() {
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
    actual.should.eql(expected);

    factorial(5).should.equal(120);
  });

  it('should be available in appropriate scope', function() {
    var foo = function(){
      var a = 3, b = 5, c = 0, bar = function(){
        var b = 7, c = 11;
        a.should.equal(3);
        b.should.equal(7);
        c.should.equal(11);
        a += b + c;
        a.should.equal(21);
        b.should.equal(7);
        c.should.equal(11);
      };
      a.should.equal(3);
      b.should.equal(5);
      c.should.equal(0);
      bar();
      a.should.equal(21);
      b.should.equal(5);
      c.should.equal(0);
    };
  });

  it('should work as a closure', function() {
    var quo = function(status){
      return {
        get_status: function(){
          return status;
        }
      };
    }, myQuo = quo("amazed");
    myQuo.get_status().should.equal("amazed");
  });

  it('should be a part of a module', function() {
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

    var source = '&lt;value=&quot;unknown&quot;&gt;';
    var expected = '<value="unknown">';
    source.deentityfy().should.equal(expected);

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
    serialMaker.generate().should.equal("Q1000");
  });

  it('should be used for currying', function() {
    Function.method('curry', function(){
      var slice = Array.prototype.slice,
          args = slice.apply(arguments),
          that = this;
      return function(){
        return that.apply(null, args.concat(slice.apply(arguments)));
      };
    });
    var add1 = add.curry(1);
    add1(6).should.equal(7);
  });

  it('should use memoization for performance optimization', function() {
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
      fibonacci(i).should.equal(expected[i]);
    }
    called.should.equal(453);

    called = 0;
    for (i = 0; i <= 10; i += 1){
      fibonacciMemoized(i).should.equal(expected[i]);
    }
    called.should.equal(29);
  });

});
