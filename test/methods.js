require('../common');

var should = require('should');

describe('methods', function() {
  describe('#array', function() {
    it('should provide concat()', function() {
      var a = ['a', 'b', 'c'];
      var b = ['x', 'y', 'z'];
      a.concat(b, true).should.eql(['a', 'b', 'c', 'x', 'y', 'z', true]);
    });

    it('should provide join()', function() {
      var a = ['a', 'b', 'c'];
      a.push('d');
      a.join('').should.equal('abcd');
    });

    it('should provide pop()', function() {
      var a = ['a', 'b', 'c'];
      var c = a.pop();
      a.should.eql(['a', 'b']);
      c.should.equal('c');
    });

    it('should provide push()', function() {
      var a = ['a', 'b', 'c'];
      var b = ['x', 'y', 'z'];
      var c = a.push(b, true);
      a.should.eql(['a', 'b', 'c', ['x', 'y', 'z'], true]);
      c.should.equal(5);
    });

    it('should provide reverse()', function() {
      var a = ['a', 'b', 'c'];
      var b = a.reverse();
      a.should.eql(['c', 'b', 'a']);
      b.should.eql(['c', 'b', 'a']);
    });

    it('should provide shift()', function() {
      var a = ['a', 'b', 'c'];
      var c = a.shift();
      a.should.eql(['b', 'c']);
      c.should.equal('a');
    });

    it('should provide slice()', function() {
      var a = ['a', 'b', 'c'];
      a.slice(0, 1).should.eql(['a']);
      a.slice(1).should.eql(['b', 'c']);
      a.slice(1, 2).should.eql(['b']);
    });

    it('should provide sort()', function() {
      var n = [4, 8, 15, 16, 23, 42];
      n.sort().should.eql([15, 16, 23, 4, 42, 8]);

      n.sort(function(a, b) {
        return a - b;
      });
      n.should.eql([4, 8, 15, 16, 23, 42]);

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
      m.should.eql([4, 8, 15, 16, 23, 42, 'a', 'aa', 'bb']);

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
      s.sort(by('first', by('last'))).should.eql(expected);
    });

    it('should provide splice()', function() {
      var a = ['a', 'b', 'c'];
      var r = a.splice(1, 1, 'ache', 'bug');
      a.should.eql(['a', 'ache', 'bug', 'c']);
      r.should.eql(['b']);
    });

    it('should provide unshift()', function() {
      var a = ['a', 'b', 'c'];
      var r = a.unshift('?', '@');
      a.should.eql(['?', '@', 'a', 'b', 'c']);
      r.should.equal(5);
    });
  });

  describe('#function', function() {
    it('should provide apply()', function() {
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
      x().should.equal(777);
    });
  });

  describe('#number', function() {
    it('should provide toExponential()', function() {
      Math.PI.toExponential(0).should.equal('3e+0');
      Math.PI.toExponential(2).should.equal('3.14e+0');
      Math.PI.toExponential(7).should.equal('3.1415927e+0');
      Math.PI.toExponential(16).should.equal('3.1415926535897931e+0');
      Math.PI.toExponential().should.equal('3.141592653589793e+0');
    });

    it('should provide toFixed()', function() {
      Math.PI.toFixed(0).should.equal('3');
      Math.PI.toFixed(2).should.equal('3.14');
      Math.PI.toFixed(7).should.equal('3.1415927');
      Math.PI.toFixed(16).should.equal('3.1415926535897931');
      Math.PI.toFixed().should.equal('3');
    });

    it('should provide toPrecision()', function() {
      Math.PI.toPrecision(2).should.equal('3.1');
      Math.PI.toPrecision(7).should.equal('3.141593');
      Math.PI.toPrecision(16).should.equal('3.141592653589793');
      Math.PI.toPrecision().should.equal('3.141592653589793');
    });

    it('should provide toString()', function() {
      Math.PI.toString(2).should.equal(
          '11.001001000011111101101010100010001000010110100011');
      Math.PI.toString(8).should.equal('3.1103755242102643');
      Math.PI.toString(16).should.equal('3.243f6a8885a3');
      Math.PI.toString().should.equal('3.141592653589793');
    });
  });

  describe('#object', function() {
    it('should provide hasOwnProperty()', function() {
      var a = {member: true};
      var b = Object.beget(a);
      a.hasOwnProperty('member').should.equal(true);
      b.hasOwnProperty('member').should.equal(false);
      b.member.should.equal(true);
    });
  });

  describe('#regexp', function() {
    it('should provide exec()', function() {
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
      result[1].fulltext.should.equal('<body bgcolor=linen>');
      result[1].name.should.equal('');
      result[1].closingTag.should.equal('body');
      result[1].attribute.should.equal(' bgcolor=linen');
      result[5].fulltext.should.equal('bold');
      should.not.exist(result[5].name);
      should.not.exist(result[5].closingTag);
      should.not.exist(result[5].attribute);
    });

    it('should provide test()', function() {
      var b = /&.+;/.test('frank &amp; beans');
      should.exist(b);
    });
  });

  describe('#string', function() {
    it('should provide charAt()', function() {
      var name = 'Curly';
      name.charAt(0).should.equal('C');
    });

    it('should provide charCodeAt()', function() {
      var name = 'Curly';
      name.charCodeAt(0).should.equal(67);
    });

    it('should provide concat()', function() {
      'C'.concat('a', 't').should.equal('Cat');
    });

    it('should provide indexOf()', function() {
      var text = 'Mississippi';
      text.indexOf('ss').should.equal(2);
      text.indexOf('ss', 3).should.equal(5);
      text.indexOf('ss', 6).should.equal(-1);
    });

    it('should provide lastIndexOf()', function() {
      var text = 'Mississippi';
      text.lastIndexOf('ss').should.equal(5);
      text.lastIndexOf('ss', 3).should.equal(2);
      text.lastIndexOf('ss', 6).should.equal(5);
    });

    it('should provide localeCompare()', function() {
      var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];
      m.sort(function(a, b) {
        return a.localeCompare(b);
      });
      // The following assertion could not pass in some locale.
      m.should.eql(['A', 'AAA', 'Aa', 'a', 'aa', 'aaa']);
    });

    it('should provide match()', function() {
      var text = '<html><body bgcolor=linen><p>' +
        'This is <b>bold<\/b>!<\/p><\/body><\/html>';
      var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
      var a = text.match(tags);
      a[0].should.equal('<html>');
      a[3].should.equal('This is ');
      a[10].should.equal('</html>');
    });

    it('should provide replace()', function() {
      var result = 'mother_in_law'.replace(/_/g, '-');
      result.should.equal('mother-in-law');

      var oldAreaCode = /\((\d{3})\)/g;
      var p = '(555)666-1212'.replace(oldAreaCode, '$1-');
      p.should.equal('555-666-1212');

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
      '<&>'.entityify().should.equal('&lt;&amp;&gt;');
    });

    it('should provide search()', function() {
      var text = 'and in it he says "Any damn fool could';
      text.search(/["']/).should.equal(18);
    });

    it('should provide slice()', function() {
      var text = 'and in it he says "Any damn fool could';
      text.slice(18).should.equal('"Any damn fool could');
      text.slice(0, 3).should.equal('and');
      text.slice(-5).should.equal('could');
      text.slice(19, 32).should.equal('Any damn fool');
    });

    it('should provide split()', function() {
      var digit = '0123456789';
      digit.split('', 5).should.eql(['0', '1', '2', '3', '4']);
      var ip = '192.168.1.0';
      ip.split('.').should.eql(['192', '168', '1', '0']);
      var t = '|a|b|c|';
      t.split('|').should.eql(['', 'a', 'b', 'c', '']);
      var text = 'last,  first ,middle';
      text.split(/\s*,\s*/).should.eql(['last', 'first', 'middle']);
      text.split(/\s*(,)\s*/).should.eql(
          ['last', ',', 'first', ',', 'middle']);
    });

    it('should provide toLowerCase()', function() {
      var name = 'Curly';
      name.toLowerCase().should.equal('curly');
    });

    it('should provide toUpperCase()', function() {
      var name = 'Curly';
      name.toUpperCase().should.equal('CURLY');
    });

    it('should provide fromCharCode()', function() {
      String.fromCharCode(67, 97, 116).should.equal('Cat');
    });
  });
});
