const { getCoins } = require('./commands/coins');
const { sendSmug } = require('./commands/smug');

const commands = [
  {
    name: 'coins',
    description: 'How many?',
    function: getCoins,
  },
  {
    name: 'smug',
    description: 'Smug?',
    function: sendSmug,
  },
];

module.exports = { commands };
