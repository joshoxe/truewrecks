const { sendEmbed } = require('../utils/discord');

async function getCoins(interaction, user, nick) {
  const coins = await user.getTruecoins();

  await sendEmbed(interaction, `${nick}: ${coins} coins!`, ' ', 'https://i.imgur.com/0d4u4zP.png');
}

module.exports = {
  getCoins,
};
