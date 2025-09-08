require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { registerCommands } = require('./utils/commandRegistrar');
const logger = require('./utils/logger');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();
client.config = {
  prefix: process.env.PREFIX || '!',
  owner: process.env.OWNER_ID
};

// load command files
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const cmd = require(path.join(commandsPath, file));
    if (cmd.name) client.commands.set(cmd.name, cmd);
  }
});

// handlers
['messageCreate','interactionCreate','guildMemberAdd'].forEach(evt => {
  const handlerPath = path.join(__dirname, 'events', evt + '.js');
  if (fs.existsSync(handlerPath)) require(handlerPath)(client);
});

// register application (slash) commands for dev guild
registerCommands(client).catch(console.error);

client.once('ready', async () => {
  logger.log('bot', `Logged in as ${client.user.tag}`);
  // start scheduler
  require('./features/quoteScheduler')(client);
});

process.on('unhandledRejection', (err) => {
  logger.log('error', String(err).slice(0,2000));
});

client.login(process.env.BOT_TOKEN);
