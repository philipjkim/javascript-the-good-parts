process.env.NODE_ENV = 'test';

var should = require('should');

describe('regular expression', function() {
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

  it('should return if a value is matched to number type', function() {
    var parseNumber = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

    parseNumber.test('1').should.equal(true);
    parseNumber.test('number').should.equal(false);
    parseNumber.test('98.6').should.equal(true);
    parseNumber.test('192.168.255.255').should.equal(false);
    parseNumber.test('123.45E-67').should.equal(true);
    parseNumber.test('123.45D-67').should.equal(false);
  });
});
