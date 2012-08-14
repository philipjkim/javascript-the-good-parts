require('../common');

var should = require('should');

describe('inheritance', function() {
  it('can be done pseudoclassically', function() {
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
    myMammal.getName().should.equal('Herb the Mammal');

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
    myCat.says().should.equal('meow');
    myCat.purr(5).should.equal('r-r-r-r-r');
    myCat.getName().should.equal('meow Henrietta meow');

    Function.method('inherits', function(Parent){
      this.prototype = new Parent();
      return this;
    });
    var NewCat = function(name){
      this.name = name;
      this.saying = 'meow';
    };
    NewCat.inherits(Mammal);
    NewCat.method('purr', function(n){
        var i = '';
        var s = '';
        for (i = 0; i < n; i += 1){
          if (s) {
            s += '-';
          }
          s += 'l';
        }
        return s;
      });
      NewCat.method('getName', function(){
        return this.says() + ' ' + this.name + ' ' + this.says();
      });

    var myNewCat = new NewCat('Turkish Angora');
    myNewCat.says().should.equal('meow');
    myNewCat.purr(5).should.equal('l-l-l-l-l');
    myNewCat.getName().should.equal('Turkish Angora'); // TODO valid assertion?
  });

  it('can be done prototypally', function() {
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
    myCat.getName().should.equal('meow Henrietta meow');
  });

  it('can be done functionally', function() {
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
    myMammal.getName().should.equal('Herb');
    myMammal.says().should.equal('');

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
    myCat.getName().should.equal('meow Henrietta meow');
    myCat.says().should.equal('meow');

    var coolcat = function(spec){
      var that = cat(spec);
      var superGetName = that.superior('getName');
      that.getName = function(n){
        return 'like ' + superGetName() + ' baby';
      };
      return that;
    };
    var myCoolcat = coolcat({name: 'Bix'});
    myCoolcat.getName().should.equal('like meow Bix meow baby');
  });
});
