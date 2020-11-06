// ---------------- External modules and aliases ---------------------
const request = require('request');


// ---------------------- Get IP-address via API ---------------------
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} ` +
                  `when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    
    const { ip } = JSON.parse(body);
    callback(null, ip);
  });
};


// --------------------- Get coordinates via API -----------------------
/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request('http://ip-api.com/json/' + ip, (error, response, body) => {

    // If request returns error
    if (error) callback(error, null);

    // if response is not code 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when ` +
                  `fetching coordinates. Response: ${body}`;
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


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the
 * for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const { lat, lon } = coords;
  const apiURL = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  request(apiURL, (error, response, body) => {
    
    // If request returns error
    if (error) callback(error, null);

    // if response is not code 200
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when ` +
                  `fetching data about ISS. Response: ${body}`;
      callback(Error(msg), null);
    }

    // Success
    const reply = JSON.parse(body);
    callback(null, reply.response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };