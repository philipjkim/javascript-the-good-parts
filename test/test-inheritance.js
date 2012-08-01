// followed felixge's Node.js style guide.
// Refer to https://github.com/felixge/node-style-guide

require('../common');

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

  var Cat = function(name){
    this.name = name;
    this.saying = 'meow';
  };
  Cat.prototype = new Mammal();
  Cat.prototype.purr = function(n){
    var i = '';
    var s = '';
    for (i = 0; i < n; i += 1){
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  Cat.prototype.getName = function(){
    return this.says() + ' ' + this.name + ' ' + this.says();
  };

  var myCat = new Cat('Henrietta');
  test.same(myCat.says(), 'meow');
  test.same(myCat.purr(5), 'r-r-r-r-r');
  test.same(myCat.getName(), 'meow Henrietta meow');

  Function.method('inherits', function(Parent){
    this.prototype = new Parent();
    return this;
  });
  var NewCat = function(name){
    this.name = name;
    this.saying = 'meow';
  }.
    inherits(Mammal).
    method('purr', function(n){
      var i = '';
      var s = '';
      for (i = 0; i < n; i += 1){
        if (s) {
          s += '-';
        }
        s += 'l';
      }
      return s;
    }).
    method('getName', function(){
      return this.says() + ' ' + this.name + ' ' + this.says();
    });

  var myNewCat = new NewCat('Turkish Angora');
  test.same(myNewCat.says(), 'meow');
  test.same(myNewCat.purr(5), 'l-l-l-l-l');
  test.same(myNewCat.getName(), 'Turkish Angora'); // TODO valid assertion?
  test.done();
};

exports.prototypal = function(test){
  var myMammal = {
    name: 'Herb the Mammal',
    getName: function(){
      return this.name;
    },
    says: function(){
      return this.saying || '';
    }
  };
  var myCat = Object.beget(myMammal);
  myCat.name = 'Henrietta';
  myCat.saying = 'meow';
  myCat.purr = function(n){
    var i = '';
    var s = '';
    for (i = 0; i < n; i += 1){
      if (s) {
        s += '-';
      }
      s+= 'r';
    }
    return s;
  };
  myCat.getName = function(){
    return this.says() + ' ' + this.name + ' ' + this.says();
  };
  test.same(myCat.getName(), 'meow Henrietta meow');
  test.done();
};
