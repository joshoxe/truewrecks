const { commands } = require('./src/commands');
const Truewrecks = require('./src/Truewrecks');
require('dotenv').config();

const truewrecks = new Truewrecks(commands);
truewrecks.registerCommands();
truewrecks.connect();
truewrecks.listen();
