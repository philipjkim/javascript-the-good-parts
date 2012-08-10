require('../common');

var should = require('should');

describe('object', function() {
  var empty_object = {};
  var stooge = {
    first_name: 'Soo',
    last_name: 'Kim'
  };
  var flight = {
    airline: 'Korean Air',
    number: 815,
    departure: {
      IATA: 'GMP',
      time: '2012-07-13 12:15',
      city: 'Gimpo'
    },
    arrival: {
      IATA: 'CJU',
      time: '2012-07-14 10:45',
      city: 'Jeju'
    }
  };

  it('should return its value by dot notation', function() {
    stooge.first_name.should.equal('Soo');
    flight.departure.IATA.should.equal('GMP');
  });

  it('should return undefined if a field is not declared', function() {
    should.not.exist(stooge.middle_name);
    should.not.exist(stooge.FIRST_NAME);
    should.not.exist(flight.status);
  });

  it('should take the right value when || is used ' +
     'and the left value is undefined', function() {
    var middle = stooge.middle_name || '(none)',
        status = flight.status || 'unknown';

    middle.should.equal('(none)');
    status.should.equal('unknown');
  });

  it('should update its field', function() {
    stooge.first_name = 'Sol';
    stooge.first_name.should.equal('Sol');

    stooge.middle_name = 'Aristotle';
    stooge.nickname = 'The troublemaker';
    flight.equipment = {
      model: 'Boeing 737'
    };
    flight.status = 'overdue';

    stooge.middle_name.should.equal('Aristotle');
    stooge.nickname.should.equal('The troublemaker');
    flight.equipment.model.should.equal('Boeing 737');
    flight.status.should.equal('overdue');
  });

  it('should be changed when its reference was changed', function() {
    var x = stooge, a = {}, b = {}, c = {};
    x.nickname = 'Curly';

    stooge.nickname.should.equal('Curly');
    a.should.not.equal(b);

    a = b = c = {};

    a.should.equal(b);
  });
  
  var another_stooge = Object.beget(stooge);

  it('should not be changed when its new child was changed', function() {
    another_stooge.first_name = 'Robert';
    another_stooge.middle_name = 'Cecil';
    another_stooge.nickname = 'Uncle Bob';

    another_stooge.first_name.should.not.equal(stooge.first_name);
    another_stooge.middle_name.should.not.equal(stooge.middle_name);
    another_stooge.nickname.should.not.equal(stooge.nickname);

    stooge.profession = 'destructor';

    another_stooge.profession.should.equal(stooge.profession);
  });

  it('should return appropriate types when typeof is used', function() {
    (typeof flight.number).should.equal('number');
    (typeof flight.status).should.equal('string');
    (typeof flight.arrival).should.equal('object');
    (typeof flight.manifest).should.equal('undefined');
    (typeof flight.toString).should.equal('function');
    (typeof flight.constructor).should.equal('function');
  });

  it('should enumerate its declared fields', function() {
    var name;
    for (name in another_stooge) {
      if (typeof another_stooge[name] !== 'function') {
        another_stooge[name].should.be.ok;
      }
    }
  });

  it('should use the value of its prototype ' +
     'when its own value deleted', function() {
    another_stooge.nickname.should.equal('Uncle Bob');

    delete another_stooge.nickname;
    another_stooge.nickname.should.equal('Curly');
  });

  var MYAPP = {};
  MYAPP.stooge = {
    first_name: 'Rosa',
    last_name: 'Park'
  };
  MYAPP.flight = {
    airline: 'Asiana Air',
    number: 816,
    departure: {
      IATA: 'GMP',
      time: '2012-07-15 12:15',
      city: 'Gimpo'
    },
    arrival: {
      IATA: 'CJU',
      time: '2012-07-16 10:45',
      city: 'Jeju'
    }
  };

  it('should be different from a global object with same name', function() {
    flight.airline.should.not.equal(MYAPP.flight.airline);
  });

});
