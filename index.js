// External modules and aliases
const { log } = console;
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// ---- Get IP-address ------
// let ip = '';
// fetchMyIP( (err, data) => {
//   if (err) log(err); // Error
//   ip = data;         // Set IP
// });

// ------- Get coordinates ----------
// let coords = {}
// fetchCoordsByIP(ip, (err, data) => {
//   if (err) log(err); // Error
//   coords = data;
// });

// { lon: -123.1291, lat: 49.2825 }

// ----------- Get info about ISS flying overhead
// let overhead = {};
// fetchISSFlyOverTimes(coord, (err, data) => {
//   if (err) log(err);  // Error
//   overhead = data;
// });