const { random } = require('lodash');
const { smugs } = require('../data/smugs');

async function sendSmug(interaction) {
  await interaction.reply(smugs[random(0, smugs.length)]);
  setTimeout(() => {
    interaction.deleteReply();
  }, 25000);
}

module.exports = { sendSmug };
