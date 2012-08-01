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

exports.functional = function(test){
  var mammal = function(spec){
    var that = {};
    that.getName = function(){
      return spec.name;
    };
    that.says = function(){
      return spec.saying || '';
    };
    return that;
  };
  var myMammal = mammal({name: 'Herb'});
  test.same(myMammal.getName(), 'Herb');
  test.same(myMammal.says(), '');

  var cat = function(spec){
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function(n){
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
    that.getName = function(){
      return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
  };
  var myCat = cat({name: 'Henrietta'});
  test.same(myCat.getName(), 'meow Henrietta meow');
  test.same(myCat.says(), 'meow');

  var coolcat = function(spec){
    var that = cat(spec);
    var superGetName = that.superior('getName');
    that.getName = function(n){
      return 'like ' + superGetName() + ' baby';
    };
    return that;
  };
  var myCoolcat = coolcat({name: 'Bix'});
  test.same(myCoolcat.getName(), 'like meow Bix meow baby');
  test.done();
};
