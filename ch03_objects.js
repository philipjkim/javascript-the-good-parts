require('./method');

// 3.1. Object Literals

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

// FIXME use nodeunit to assert values.

// 3.2. Retrieval
 
console.log(stooge.first_name);
console.log(flight.departure.IATA);

// undefined expected
console.log(stooge.middle_name);
console.log(flight.status);
console.log(stooge.FIRST_NAME);

var middle = stooge.middle_name || "(none)";
var status = flight.status || "unknown";
console.log(middle);
console.log(status);

console.log(flight.equipment);
try {
  console.log(flight.equipment.model);
} catch (e) {
  console.log(e);
}
console.log(flight.equipment && flight.equipment.model);

// 3.3. Update

stooge.first_name = "Sol";
console.log(stooge.first_name);

stooge.middle_name = "Aristotle";
stooge.nickname = "The troublemaker";
flight.equipment = {
  model: "Boeing 737"
};
flight.status = "overdue";
console.log(stooge.middle_name);
console.log(stooge.nickname);
console.log(flight.equipment.model);
console.log(flight.status);

// 3.4. Reference

var x = stooge;
x.nickname = 'Curly';
console.log(stooge.nickname);

var a = {}, b = {}, c = {};
console.log(a === b);
a = b = c = {};
console.log(a === b);

// 3.5. Prototype

if (typeof Object.beget !== "function") {
  Object.beget = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.beget(stooge);
another_stooge.first_name = "Robert";
another_stooge.middle_name = "Cecil";
another_stooge.nickname = "Uncle Bob";
console.log(another_stooge);
console.log(stooge);
stooge.profession = "destructor";
console.log(another_stooge.profession);

// 3.6. Reflection

console.log(typeof flight.number);
console.log(typeof flight.status);
console.log(typeof flight.arrival);
console.log(typeof flight.manifest);
console.log(typeof flight.toString);
console.log(typeof flight.constructor);
console.log(flight.hasOwnProperty("number"));
console.log(flight.hasOwnProperty("constructor"));

// 3.7. Enumeration

var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== "function") {
    console.log("%s: %s", name, another_stooge[name]);
  }
}

// 3.8. Delete

console.log(another_stooge.nickname);
delete another_stooge.nickname;
console.log(another_stooge.nickname);

// 3.9. Global Abatement

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
console.log(flight);
console.log(MYAPP.flight);
