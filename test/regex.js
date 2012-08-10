process.env.NODE_ENV = 'test';

var should = require('should');

describe('regex#exec()', function() {
  it('should parse a URL as expected', function() {
    var parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var url = 'http://www.ora.com:80/goodparts?q#fragment';
    var result = parseUrl.exec(url);
    var names = ['url', 'scheme', 'slash', 'host', 'port',
      'path', 'query', 'hash'];
    var i;
    var map = {};
    for (i = 0; i < names.length; i += 1){
      map[names[i]] = result[i];
    }

    map.url.should.equal('http://www.ora.com:80/goodparts?q#fragment');
    map.scheme.should.equal('http');
    map.slash.should.equal('//');
    map.host.should.equal('www.ora.com');
    map.port.should.equal('80');
    map.path.should.equal('goodparts');
    map.query.should.equal('q');
    map.hash.should.equal('fragment');
  });
});

describe('regex#test()', function() {
  it('should return if a value is matched to number type', function() {
    var parseNumber = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

    parseNumber.test('1').should.be.true;
    parseNumber.test('number').should.be.false;
    parseNumber.test('98.6').should.be.true;
    parseNumber.test('192.168.255.255').should.be.false;
    parseNumber.test('123.45E-67').should.be.true;
    parseNumber.test('123.45D-67').should.be.false;
  });
});
