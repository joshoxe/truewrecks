const {
  REST, Routes, Client, GatewayIntentBits,
} = require('discord.js');
const Cooldown = require('./utils/cooldown');
const User = require('./utils/user');
const { getCoinPay } = require('./utils/coins');

module.exports = class Truewrecks {
  constructor(commands) {
    this.commands = commands;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
    });
    this.cooldown = new Cooldown();
  }

  async registerCommands() {
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

    (async () => {
      try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), {
          body: this.commands,
        });

        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    })();
  }

  async connect() {
    this.client.login(process.env.BOT_TOKEN);
  }

  async listen() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });

    this.client.on('interactionCreate', async (interaction) => this.handleInteractionCreate(interaction));

    this.client.on('messageCreate', async (message) => this.handleMessageCreate(message));
  }

  async handleInteractionCreate(interaction) {
    if (!interaction.isChatInputCommand() || this.cooldown.hasCooldown(interaction.user.id)) {
      return;
    }

    const user = new User(interaction.user);
    user.findOrCreateUser();

    if (user.user.username === 'Omri') {
      await interaction.reply('27% haste omri?');
      return;
    }

    const command = this.commands.find((c) => c.name === interaction.commandName);

    if (command) {
      await command.function(interaction, user, interaction.member.nickname ?? user.user.username);
    }

    // Add coins for message
    await user.addTruecoins(getCoinPay());
    this.cooldown.addCooldown(interaction.user.id);
  }

  async handleMessageCreate(message) {
    if (message.author.bot || this.cooldown.hasCooldown(message.author.id)) return;

    const user = new User(message.author);
    user.findOrCreateUser();

    // Add coins for message
    await user.addTruecoins(getCoinPay());

    this.cooldown.addCooldown(user.id);
  }
};
