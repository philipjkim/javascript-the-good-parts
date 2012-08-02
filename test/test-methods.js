require('../common');

exports['array.concat'] = function(test) {
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  test.same(a.concat(b, true), ['a', 'b', 'c', 'x', 'y', 'z', true]);
  test.done();
};

exports['array.join'] = function(test) {
  var a = ['a', 'b', 'c'];
  a.push('d');
  test.same(a.join(''), 'abcd');
  test.done();
};

exports['array.pop'] = function(test) {
  var a = ['a', 'b', 'c'];
  var c = a.pop();
  test.same(a, ['a', 'b']);
  test.same(c, 'c');
  test.done();
};

exports['array.push'] = function(test) {
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  var c = a.push(b, true);
  test.same(a, ['a', 'b', 'c', ['x', 'y', 'z'], true]);
  test.same(c, 5);
  test.done();
};

exports['array.reverse'] = function(test) {
  var a = ['a', 'b', 'c'];
  var b = a.reverse();
  test.same(a, ['c', 'b', 'a']);
  test.same(b, ['c', 'b', 'a']);
  test.done();
};

exports['array.shift'] = function(test) {
  var a = ['a', 'b', 'c'];
  var c = a.shift();
  test.same(a, ['b', 'c']);
  test.same(c, 'a');
  test.done();
};

exports['array.slice'] = function(test) {
  var a = ['a', 'b', 'c'];
  test.same(a.slice(0, 1), ['a']);
  test.same(a.slice(1), ['b', 'c']);
  test.same(a.slice(1, 2), ['b']);
  test.done();
};

exports['array.sort'] = function(test) {
  var n = [4, 8, 15, 16, 23, 42];
  test.same(n.sort(), [15, 16, 23, 4, 42, 8]);

  n.sort(function(a, b) {
    return a - b;
  });
  test.same(n, [4, 8, 15, 16, 23, 42]);

  var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
  m.sort(function(a, b) {
    if (a === b) {
      return 0;
    }
    if (typeof a === typeof b) {
      return a < b ? -1 : 1;
    }
    return typeof a < typeof b ? -1 : 1;
  });
  test.same(m, [4, 8, 15, 16, 23, 42, 'a', 'aa', 'bb']);

  var by = function(name, minor) {
    return function(o, p) {
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

exports['array.splice'] = function(test) {
  var a = ['a', 'b', 'c'];
  var r = a.splice(1, 1, 'ache', 'bug');
  test.same(a, ['a', 'ache', 'bug', 'c']);
  test.same(r, ['b']);
  test.done();
};

exports['array.unshift'] = function(test) {
  var a = ['a', 'b', 'c'];
  var r = a.unshift('?', '@');
  test.same(a, ['?', '@', 'a', 'b', 'c']);
  test.same(r, 5);
  test.done();
};

exports['function.apply'] = function(test) {
  Function.method('bind', function(that) {
    var method = this;
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments, [1]);
    return function() {
      return method.apply(that, args.concat(slice.apply(arguments, [0])));
    };
  });
  var x = function() {
    return this.value;
  }.bind({value: 777});
  test.same(x(), 777);
  test.done();
};

exports['number.toExponential'] = function(test) {
  test.same(Math.PI.toExponential(0), 3e+0);
  test.same(Math.PI.toExponential(2), 3.14e+0);
  test.same(Math.PI.toExponential(7), 3.1415927e+0);
  test.same(Math.PI.toExponential(16), 3.1415926535897930e+0);
  test.same(Math.PI.toExponential(), 3.141592653589793e+0);
  test.done();
};

exports['number.toFixed'] = function(test) {
  test.same(Math.PI.toFixed(0), 3);
  test.same(Math.PI.toFixed(2), 3.14);
  test.same(Math.PI.toFixed(7), 3.1415927);
  test.same(Math.PI.toFixed(16), 3.1415926535897930);
  test.same(Math.PI.toFixed(), 3);
  test.done();
};

exports['number.toPrecision'] = function(test) {
  test.same(Math.PI.toPrecision(2), 3.1);
  test.same(Math.PI.toPrecision(7), 3.141593);
  test.same(Math.PI.toPrecision(16), 3.141592653589793);
  test.same(Math.PI.toPrecision(), 3.141592653589793);
  test.done();
};

exports['number.toString'] = function(test) {
  test.same(Math.PI.toString(2),
            '11.001001000011111101101010100010001000010110100011');
  test.same(Math.PI.toString(8), '3.1103755242102643');
  test.same(Math.PI.toString(16), '3.243f6a8885a3');
  test.same(Math.PI.toString(), '3.141592653589793');
  test.done();
};

exports['object.hasOwnProperty'] = function(test) {
  var a = {member: true};
  var b = Object.beget(a);
  test.same(a.hasOwnProperty('member'), true);
  test.same(b.hasOwnProperty('member'), false);
  test.same(b.member, true);
  test.done();
};

exports['regexp.exec'] = function(test) {
  var text = '<html><body bgcolor=linen><p>' +
    'This is <b>bold<\/b>!<\/p><\/body><\/html>';
  var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
  var a;
  var result = [];
  while ((a = tags.exec(text)) !== null) {
    var tag = {};
    tag.fulltext = a[0];
    tag.name = a[1];
    tag.closingTag = a[2];
    tag.attribute = a[3];
    result.push(tag);
  }
  test.same(result[1].fulltext, '<body bgcolor=linen>');
  test.same(result[1].name, '');
  test.same(result[1].closingTag, 'body');
  test.same(result[1].attribute, ' bgcolor=linen');
  test.same(result[5].fulltext, 'bold');
  test.same(result[5].name, undefined);
  test.same(result[5].closingTag, undefined);
  test.same(result[5].attribute, undefined);
  test.done();
};

exports['regexp.test'] = function(test) {
  var b = /&.+;/.test('frank &amp; beans');
  test.ok(b);
  test.done();
};

exports['string.charAt'] = function(test) {
  var name = 'Curly';
  test.same(name.charAt(0), 'C');
  test.done();
};

exports['string.charCodeAt'] = function(test) {
  var name = 'Curly';
  test.same(name.charCodeAt(0), 67);
  test.done();
};

exports['string.concat'] = function(test) {
  test.same('C'.concat('a', 't'), 'Cat');
  test.done();
};

exports['string.indexOf'] = function(test) {
  var text = 'Mississippi';
  test.same(text.indexOf('ss'), 2);
  test.same(text.indexOf('ss', 3), 5);
  test.same(text.indexOf('ss', 6), -1);
  test.done();
};

exports['string.lastIndexOf'] = function(test) {
  var text = 'Mississippi';
  test.same(text.lastIndexOf('ss'), 5);
  test.same(text.lastIndexOf('ss', 3), 2);
  test.same(text.lastIndexOf('ss', 6), 5);
  test.done();
};

exports['string.localeCompare'] = function(test) {
  var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];
  m.sort(function(a, b) {
    return a.localeCompare(b);
  });
  // The following assertion could not pass in some locale.
  test.same(m, ['A', 'AAA', 'Aa', 'a', 'aa', 'aaa']);
  test.done();
};

exports['string.match'] = function(test) {
  var text = '<html><body bgcolor=linen><p>' +
    'This is <b>bold<\/b>!<\/p><\/body><\/html>';
  var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
  var a = text.match(tags);
  test.same(a[0], '<html>');
  test.same(a[3], 'This is ');
  test.same(a[10], '</html>');
  test.done();
};

exports['string.replace'] = function(test) {
  var result = 'mother_in_law'.replace(/_/g, '-');
  test.same(result, 'mother-in-law');

  var oldAreaCode = /\((\d{3})\)/g;
  var p = '(555)666-1212'.replace(oldAreaCode, '$1-');
  test.same(p, '555-666-1212');

  String.method('entityify', (function() {
    var character = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    };
    return function() {
      return this.replace(/[<>&"]/g, function(c) {
        return character[c];
      });
    };
  } ()));
  test.same('<&>'.entityify(), '&lt;&amp;&gt;');
  test.done();
};

exports['string.search'] = function(test) {
  var text = 'and in it he says "Any damn fool could';
  test.same(text.search(/["']/), 18);
  test.done();
};

exports['string.slice'] = function(test) {
  var text = 'and in it he says "Any damn fool could';
  test.same(text.slice(18), '"Any damn fool could');
  test.same(text.slice(0, 3), 'and');
  test.same(text.slice(-5), 'could');
  test.same(text.slice(19, 32), 'Any damn fool');
  test.done();
};

exports['string.split'] = function(test) {
  var digit = '0123456789';
  test.same(digit.split('', 5), ['0', '1', '2', '3', '4']);
  var ip = '192.168.1.0';
  test.same(ip.split('.'), ['192', '168', '1', '0']);
  var t = '|a|b|c|';
  test.same(t.split('|'), ['', 'a', 'b', 'c', '']);
  var text = 'last,  first ,middle';
  test.same(text.split(/\s*,\s*/), ['last', 'first', 'middle']);
  test.same(text.split(/\s*(,)\s*/), ['last', ',', 'first', ',', 'middle']);
  test.done();
};

exports['string.toLowerCase'] = function(test) {
  var name = 'Curly';
  test.same(name.toLowerCase(), 'curly');
  test.done();
};

exports['string.toUpperCase'] = function(test) {
  var name = 'Curly';
  test.same(name.toUpperCase(), 'CURLY');
  test.done();
};

exports['string.fromCharCode'] = function(test) {
  test.same(String.fromCharCode(67, 97, 116), 'Cat');
  test.done();
};
