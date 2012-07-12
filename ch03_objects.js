require('./method');

// 3.1. Object Literals

var empty_object = {};

var stooge = {
  first_name: "Soo",
  last_name: "Kim"
};

var flight = {
  airline: "Jin Air",
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

