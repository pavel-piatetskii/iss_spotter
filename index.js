// External modules and aliases
const { log } = console;
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation(overhead => {
  let result = '';
  for (const pass of overhead) {
    const { duration, risetime } = pass;
    const time = new Date(risetime * 1000);
    result += `Next pass at ${time} for ${duration} seconds!\n`;
  }
  log(result);
});