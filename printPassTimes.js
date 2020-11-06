const printPassTimes = function(passTimes) {
  let result = '';
  for (const pass of passTimes) {
    const { duration, risetime } = pass;
    const time = new Date(risetime * 1000);
    result += `Next pass at ${time} for ${duration} seconds!\n`;
  }
  console.log(result);
};

module.exports = { printPassTimes };