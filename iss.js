// External modules and aliases
const request = require('request');

// ------- Get IP-address via API ---------
const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    
    const { ip } = JSON.parse(body);
    callback(null, ip);
  });
};

// --------- Get coordinates via API ----------
const fetchCoordsByIP = function(ip, callback) {
  request('http://ip-api.com/json/' + ip, (error, response, body) => {

    // If request returns error
    if (error) callback(error, null);

    // if response is not code 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
    }

    // Parse JSON string into object (we need this due to the API especialities)
    const reply = JSON.parse(body);

    // If API replied with 'fail' status - throw an Error
    if (reply.status === 'fail') {
      const msg = `Request failed! ${body}`;
      callback(Error(msg), null);
    }

    // Success
    const { lat, lon } = reply;
    callback(null, { lon, lat });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };