exports.example = function(test){
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
  test.same(map.url, 'http://www.ora.com:80/goodparts?q#fragment');
  test.same(map.scheme, 'http');
  test.same(map.slash, '//');
  test.same(map.host, 'www.ora.com');
  test.same(map.port, '80');
  test.same(map.path, 'goodparts');
  test.same(map.query, 'q');
  test.same(map.hash, 'fragment');

  var parseNumber = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
  test.same(parseNumber.test('1'), true);
  test.same(parseNumber.test('number'), false);
  test.same(parseNumber.test('98.6'), true);
  test.same(parseNumber.test('192.168.255.255'), false);
  test.same(parseNumber.test('123.45E-67'), true);
  test.same(parseNumber.test('123.45D-67'), false);
  test.done();
};
