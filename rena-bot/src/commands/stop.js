const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const logger = require('../utils/logger');

module.exports = {
  name: 'stop',
  data: new SlashCommandBuilder().setName('stop').setDescription('Stop and leave voice'),
  async execute({ interaction }) {
    const conn = getVoiceConnection(interaction.guildId);
    if (conn) {
      conn.destroy();
      logger.log('music', `Stopped in ${interaction.guild.name}`);
      await interaction.reply({ content: 'Stopped.' });
    } else {
      await interaction.reply({ content: 'Bot tidak sedang di voice.', ephemeral: true });
    }
  }
};
