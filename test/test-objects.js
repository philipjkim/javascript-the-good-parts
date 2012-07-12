require('../method');

var empty_object = {};

var stooge = {
  first_name: "Soo",
  last_name: "Kim"
};

var flight = {
  airline: "Korean Air",
  number: 815,
  departure: {
    IATA: "GMP",
    time: "2012-07-13 12:15",
    city: "Gimpo"
  },
  arrival: {
    IATA: "CJU",
    time: "2012-07-14 10:45",
    city: "Jeju"
  }
};

exports['retrieval'] = function(test){
  test.same(stooge.first_name, 'Soo');
  test.same(flight.departure.IATA, 'GMP');

  test.same(stooge.middle_name, undefined);
  test.same(stooge.FIRST_NAME, undefined);
  test.same(flight.status, undefined);

  var middle = stooge.middle_name || "(none)";
  var status = flight.status || "unknown";
  test.same(middle, "(none)");
  test.same(status, "unknown");

  test.same(flight.equipment, undefined);
  test.throws(
    function(){
      test.same(flight.equipment.model);
    },
    TypeError
  );
  test.same(flight.equipment && flight.equipment.model, undefined);
  test.done();
};

exports['update'] = function(test){
  stooge.first_name = "Sol";
  test.same(stooge.first_name, "Sol");

  stooge.middle_name = "Aristotle";
  stooge.nickname = "The troublemaker";
  flight.equipment = {
    model: "Boeing 737"
  };
  flight.status = "overdue";
  test.same(stooge.middle_name, "Aristotle");
  test.same(stooge.nickname, "The troublemaker");
  test.same(flight.equipment.model, "Boeing 737");
  test.same(flight.status, "overdue");
  test.done();
};

exports['reference'] = function(test){
  var x = stooge;
  x.nickname = "Curly";
  test.same(stooge.nickname, "Curly");

  var a = {}, b = {}, c = {};
  test.ok(a != b);
  test.ok(a !== b);
  a = b = c = {};
  test.ok(a == b);
  test.ok(a === b);
  test.done();
};

if (typeof Object.beget !== "function") {
  Object.beget = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.beget(stooge);

exports['prototype'] = function(test){
  another_stooge.first_name = "Robert";
  another_stooge.middle_name = "Cecil";
  another_stooge.nickname = "Uncle Bob";
  test.ok(another_stooge.first_name != stooge.first_name);
  test.ok(another_stooge.middle_name != stooge.middle_name);
  test.ok(another_stooge.nickname != stooge.nickname);
  stooge.profession = "destructor";
  test.ok(another_stooge.profession == stooge.profession);
  test.done();
};

exports['reflection'] = function(test){
  test.same(typeof flight.number, "number");
  test.same(typeof flight.status, "string");
  test.same(typeof flight.arrival, "object");
  test.same(typeof flight.manifest, "undefined");
  test.same(typeof flight.toString, "function");
  test.same(typeof flight.constructor, "function");
  test.ok(flight.hasOwnProperty("number"));
  test.ok(!flight.hasOwnProperty("constructor"));
  test.done();
};

exports['enumeration'] = function(test){
  var name;
  for (name in another_stooge) {
    if (typeof another_stooge[name] !== "function") {
      test.ok(another_stooge[name]);
    }
  }
  test.done();
};

exports['delete'] = function(test){
  test.same(another_stooge.nickname, "Uncle Bob");
  delete another_stooge.nickname;
  test.same(another_stooge.nickname, "Curly");
  test.done();
};

var MYAPP = {};
MYAPP.stooge = {
  first_name: "Rosa",
  last_name: "Park"
};
MYAPP.flight = {
  airline: "Asiana Air",
  number: 816,
  departure: {
    IATA: "GMP",
    time: "2012-07-15 12:15",
    city: "Gimpo"
  },
  arrival: {
    IATA: "CJU",
    time: "2012-07-16 10:45",
    city: "Jeju"
  }
};

exports['global abatement'] = function(test){
  test.ok(flight.airline !== MYAPP.flight.airline);
  test.done();
};
