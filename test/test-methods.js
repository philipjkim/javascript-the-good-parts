exports['array.concat'] = function(test){
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  test.same(a.concat(b, true), ['a', 'b', 'c', 'x', 'y', 'z', true]);
  test.done();
};

exports['array.join'] = function(test){
  var a = ['a', 'b', 'c'];
  a.push('d');
  test.same(a.join(''), 'abcd');
  test.done();
};

exports['array.pop'] = function(test){
  var a = ['a', 'b', 'c'];
  var c = a.pop();
  test.same(a, ['a', 'b']);
  test.same(c, 'c');
  test.done();
};

exports['array.push'] = function(test){
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  var c = a.push(b, true);
  test.same(a, ['a', 'b', 'c', ['x', 'y', 'z'], true]);
  test.same(c, 5);
  test.done();
};

exports['array.reverse'] = function(test){
  var a = ['a', 'b', 'c'];
  var b = a.reverse();
  test.same(a, ['c', 'b', 'a']);
  test.same(b, ['c', 'b', 'a']);
  test.done();
};

exports['array.shift'] = function(test){
  var a = ['a', 'b', 'c'];
  var c = a.shift();
  test.same(a, ['b', 'c']);
  test.same(c, 'a');
  test.done();
};

exports['array.slice'] = function(test){
  var a = ['a', 'b', 'c'];
  test.same(a.slice(0, 1), ['a']);
  test.same(a.slice(1), ['b', 'c']);
  test.same(a.slice(1, 2), ['b']);
  test.done();
};

exports['array.sort'] = function(test){
  var n = [4, 8, 15, 16, 23, 42];
  test.same(n.sort(), [15, 16, 23, 4, 42, 8]);

  n.sort(function(a, b){
    return a - b;
  });
  test.same(n, [4, 8, 15, 16, 23, 42]);

  var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
  m.sort(function(a, b){
    if (a === b) {
      return 0;
    }
    if (typeof a === typeof b) {
      return a < b ? -1 : 1;
    }
    return typeof a < typeof b ? -1 : 1;
  });
  test.same(m, [4, 8, 15, 16, 23, 42, 'a', 'aa', 'bb']);

  var by = function(name, minor){
    return function(o, p){
      var a, b;
      if (typeof o === 'object' && typeof p === 'object' && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return typeof minor === 'function' ? minor(o, p) : 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      }
      throw {
        name: 'Error',
        message: 'Expected an object when sorting by ' + name
      };
    };
  };
  var s = [
    {first: 'Joe',   last: 'DeRita'},
    {first: 'Moe',   last: 'Howard'},
    {first: 'Joe',   last: 'Besser'},
    {first: 'Shemp', last: 'Howard'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Curly', last: 'Howard'}
  ];
  var expected = [
    {first: 'Curly', last: 'Howard'},
    {first: 'Joe',   last: 'Besser'},
    {first: 'Joe',   last: 'DeRita'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Moe',   last: 'Howard'},
    {first: 'Shemp', last: 'Howard'}
  ];
  test.same(s.sort(by('first', by('last'))), expected);
  test.done();
};

exports['array.splice'] = function(test){
  var a = ['a', 'b', 'c'];
  var r = a.splice(1, 1, 'ache', 'bug');
  test.same(a, ['a', 'ache', 'bug', 'c']);
  test.same(r, ['b']);
  test.done();
};

exports['array.unshift'] = function(test){
  var a = ['a', 'b', 'c'];
  var r = a.unshift('?', '@');
  test.same(a, ['?', '@', 'a', 'b', 'c']);
  test.same(r, 5);
  test.done();
};
