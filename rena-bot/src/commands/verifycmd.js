const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'verify',
  data: new SlashCommandBuilder().setName('verify').setDescription('Tampilkan tombol verifikasi'),
  async execute({ interaction }) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('verify_button')
          .setLabel('Verifikasi')
          .setStyle(ButtonStyle.Success)
      );
    await interaction.reply({ content: 'Tekan untuk verifikasi', components: [row], ephemeral: false });
  }
};
