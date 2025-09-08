module.exports = (client) => {
  client.on('interactionCreate', async interaction => {
    // select menus & buttons
    if (interaction.isStringSelectMenu()) {
      const handler = require('../features/roleDropdown');
      return handler(interaction);
    }
    if (interaction.isButton()) {
      const handler = require('../features/verify');
      return handler(interaction);
    }
    // slash commands
    if (!interaction.isChatInputCommand()) return;
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;
    try {
      await cmd.execute({ client, interaction });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Error executing command', ephemeral: true });
    }
  });
};
