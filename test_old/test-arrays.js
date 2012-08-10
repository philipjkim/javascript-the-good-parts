require('../common');

var empty = [];
var numbers = [ 'zero', 'one', 'two', 'three', 'four',
                'five', 'six', 'seven', 'eight', 'nine'
];

exports['array literals'] = function(test){
  test.same(empty[1], undefined);
  test.same(numbers[1], 'one');
  test.same(empty.length, 0);
  test.same(numbers.length, 10);

  var numbersObject = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
  };
  test.same(numbers.isArray(), true);
  test.same(numbersObject.isArray(), false);

  var misc = [
      'string', 98.6, true, false, null, undefined,
      ['nested', 'array'], {object: true}, NaN, Infinity
  ];
  test.same(misc.length, 10);
  test.done();
};

exports.length = function(test){
  var myArray = [];
  test.same(myArray.length, 0);

  myArray[100000] = true;
  test.same(myArray.length, 100001);

  numbers.length = 3;
  test.same(numbers, ['zero', 'one', 'two']);

  numbers[numbers.length] = 'shi';
  test.same(numbers, ['zero', 'one', 'two', 'shi']);

  numbers.push('go');
  test.same(numbers, ['zero', 'one', 'two', 'shi', 'go']);
  test.done();
};

exports['delete'] = function(test){
  delete numbers[2];
  test.same(numbers.length, 5);
  test.same(numbers[2], undefined);

  numbers.splice(2, 1);
  test.same(numbers.length, 4);
  test.same(numbers[2], 'shi');
  test.same(numbers, ['zero', 'one', 'shi', 'go']);
  test.done();
};

exports.confusion = function(test){
  // isArray in common.js is recommended.
  var isArray = function(value){
    return value &&
      typeof value === 'object' &&
      typeof value.length === 'number' &&
      typeof value.splice === 'function' &&
      !(value.propertyIsEnumerable('length'));
  };
  test.same(isArray([1, 2, 3]), true);
  test.same(isArray({one: 1, two: 2, three: 3}), false);
  test.done();
};

exports.methods = function(test){
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

  var sum = data.reduce(add, 0);
  test.same(sum, 108);

  var product = data.reduce(mult, 1);
  test.same(product, 7418880);

  data.total = function(){
    return this.reduce(add, 0);
  };
  test.same(data.total(), 108);
  test.done();
};

exports.dimensions = function(test){
  var i;
  Array.dim = function(dimension, initial){
    var a = [];
    for (i = 0; i < dimension; i += 1){
      a[i] = initial;
    }
    return a;
  };
  var myArray = Array.dim(5, 0);
  test.same(myArray, [0, 0, 0, 0, 0]);
  
  var matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  test.same(matrix[2][1], 7);

  for (i = 0; i < 5; i += 1){
    myArray[i] = [];
  }
  test.same(myArray, [[], [], [], [], []]);

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
  test.same(myMatrix[3][3], 0);

  Array.identity = function(n){
    var i;
    var mat = Array.matrix(n, n, 0);
    for (i = 0; i < n; i += 1){
      mat[i][i] = 1;
    }
    return mat;
  };
  myMatrix = Array.identity(4);
  test.same(myMatrix[3][3], 1);
  test.done();
};
