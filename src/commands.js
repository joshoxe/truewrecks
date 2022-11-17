const { getCoins } = require('./commands/coins');
const Ping = require('./commands/ping');
const { sendSmug } = require('./commands/smug');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    function: Ping,
  },
  {
    name: 'pong',
    description: 'Replies with Ping!',
    function: Ping,
  },
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
