const { sendReply } = require('../utils/discord');

module.exports = async function Ping(interaction) {
  await sendReply(interaction, 'Pong!');
};
