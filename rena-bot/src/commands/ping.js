module.exports = {
  name: 'ping',
  data: null,
  execute: async ({ client, message, interaction }) => {
    if (message) return message.reply('Pong!');
    if (interaction) return interaction.reply('Pong!');
  }
};
