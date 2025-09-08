const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

async function registerCommands(client) {
  try {
    const commands = [];
    const commandsPath = path.join(__dirname, '..', 'commands');
    fs.readdirSync(commandsPath).forEach(file => {
      if (file.endsWith('.js')) {
        const cmd = require(path.join(commandsPath, file));
        if (cmd.data) commands.push(cmd.data.toJSON());
      }
    });
    if (!process.env.BOT_TOKEN || !process.env.GUILD_ID) return;
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), { body: commands });
    console.log('Registered slash commands to guild', process.env.GUILD_ID);
  } catch (e) {
    console.error('Failed registering commands', e);
  }
}

module.exports = { registerCommands };
