// External modules and aliases
const { log } = console;
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// ---- Get IP-address ------
// let ip = '';
// fetchMyIP( (err, data) => {
//   if (err) log(err); // Error
//   ip = data;         // Set IP
// });

// let coords = {}
// fetchCoordsByIP(ip, (err, data) => {
//   if (err) log(err); // Error
//   coords = data;
// });