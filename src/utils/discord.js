const { EmbedBuilder } = require('discord.js');

async function sendEmbed(interaction, title, description, image) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setImage(image)
    .setDescription(description);

  interaction.reply({ embeds: [embed] });

  setTimeout(() => {
    interaction.deleteReply();
  }, 25000);
}

module.exports = {
  sendEmbed,
};
