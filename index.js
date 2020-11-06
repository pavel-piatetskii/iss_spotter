// External modules and aliases
const { log } = console;
const { fetchMyIP } = require('./iss');


// ---- Get IP-address ------
let ip = '';
fetchMyIP((err, data) => {
  if (err) log(err); // Error
  ip = data;         // Set IP
});

