const { random } = require('lodash');

function getCoinPay() {
  // TODO: Check interactions, replies, embeds etc.

  return random(2, 5);
}

module.exports = {
  getCoinPay,
};
