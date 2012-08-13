require('../common');

var should = require('should');

describe('array', function() {
  var empty = [];
  var numbers = [ 'zero', 'one', 'two', 'three', 'four',
                  'five', 'six', 'seven', 'eight', 'nine'
  ];

  it('should return undefined if the index is out of bound', function() {
    should.not.exist(empty[1]);
  });

  it('should return a value if the index is valid', function() {
    numbers[1].should.equal('one');
  });

  it('should return 0 for length if the array is empty', function() {
    empty.length.should.equal(0);
  });

  it('should return the length for length ' +
     'if the array is not empty', function() {
    numbers.length.should.equal(10);
  });

  var numbersObject = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
  };

  it('should return true for isArray() if the object is an array', function() {
    numbers.isArray().should.equal(true);
  });

  it('should return false for isArray() ' +
     'if the object is not an array', function() {
    numbersObject.isArray().should.equal(false);
  });

  var misc = [
      'string', 98.6, true, false, null, undefined,
      ['nested', 'array'], {object: true}, NaN, Infinity
  ];

  it('should return the length if the array has a nested array', function() {
    misc.length.should.equal(10);
  });

  it('should return n+1 for length ' +
     'if the index of last element is n', function() {
    var myArray = [];
    myArray.length.should.equal(0);

    myArray[100000] = true;
    myArray.length.should.equal(100001);
  });

  it('should have n elements if length is set to n', function() {
    numbers.length = 3;
    numbers.should.eql(['zero', 'one', 'two']);

    numbers[numbers.length] = 'shi';
    numbers.should.eql(['zero', 'one', 'two', 'shi']);

    numbers.push('go');
    numbers.should.eql(['zero', 'one', 'two', 'shi', 'go']);
  });

  it('should not change the length after delete()', function() {
    numbers.length.should.equal(5);
    delete numbers[2];
    numbers.length.should.equal(5);
    should.not.exist(numbers[2]);
  });

  it('should decrease the length after splice()', function() {
    numbers.length.should.equal(5);
    numbers.splice(2, 1);
    numbers.length.should.equal(4);
    numbers[2].should.equal('shi');
    numbers.should.eql(['zero', 'one', 'shi', 'go']);
  });

  it('should be differentiated with other objects by isArray()', function() {
    var arr = [1, 2, 3];
    arr.isArray().should.equal(true);
    var notArr = {one: 1, two: 2, three: 3};
    notArr.isArray().should.equal(false);
  });

  Array.method('reduce', function(f, value){
    var i;
    for (i = 0; i < this.length; i += 1){
      value = f(this[i], value);
    }
    return value;
  });

  var data = [4, 8, 15, 16, 23, 42];
  var add = function(a, b){
    return a + b;
  };
  var mult = function(a, b){
    return a * b;
  };

  it('should have methods and use them', function() {
    var sum = data.reduce(add, 0);
    sum.should.equal(108);

    var product = data.reduce(mult, 1);
    product.should.equal(7418880);

    data.total = function(){
      return this.reduce(add, 0);
    };
    data.total().should.equal(108);
  });

  it('should be multidimensional', function() {
    var i;
    Array.dim = function(dimension, initial){
      var a = [];
      for (i = 0; i < dimension; i += 1){
        a[i] = initial;
      }
      return a;
    };
    var myArray = Array.dim(5, 0);
    myArray.should.eql([0, 0, 0, 0, 0]);
    
    var matrix = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
    matrix[2][1].should.equal(7);

    for (i = 0; i < 5; i += 1){
      myArray[i] = [];
    }
    myArray.should.eql([[], [], [], [], []]);

    Array.matrix = function(m, n, initial){
      var a;
      var i;
      var j;
      var mat = [];
      for (i = 0; i < m; i += 1){
        a = [];
        for (j = 0; j < n; j += 1){
          a[j] = initial;
        }
        mat[i] = a;
      }
      return mat;
    };
    var myMatrix = Array.matrix(4, 4, 0);
    myMatrix[3][3].should.equal(0);

    Array.identity = function(n){
      var i;
      var mat = Array.matrix(n, n, 0);
      for (i = 0; i < n; i += 1){
        mat[i][i] = 1;
      }
      return mat;
    };
    myMatrix = Array.identity(4);
    myMatrix[3][3].should.equal(1);
  });
});
