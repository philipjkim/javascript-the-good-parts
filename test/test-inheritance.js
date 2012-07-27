// followed felixge's Node.js style guide.
// Refer to https://github.com/felixge/node-style-guide

exports.pseudoclassical = function(test) {
  var Mammal = function(name) {
    this.name = name;
  };
  Mammal.prototype.getName = function() {
    return this.name;
  };
  Mammal.prototype.says = function() {
    return this.saying || '';
  };

  var myMammal = new Mammal('Herb the Mammal');
  test.same(myMammal.getName(), 'Herb the Mammal');
  test.done();
};
