const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lihat daftar perintah dan cara pakai'),
  async execute({ client, interaction, message }) {
    const cmds = Array.from(client.commands.values())
      .map(c => c.data ? `**/${c.data.name}** - ${c.data.description}` : `**${client.config.prefix}${c.name}**`)
      .join("\n");
    const embed = new EmbedBuilder()
      .setTitle('📖 Daftar Perintah')
      .setDescription(cmds || 'Tidak ada perintah terdaftar')
      .setColor(0x9b59b6);
    if (interaction) return interaction.reply({ embeds: [embed], ephemeral: true });
    if (message) return message.reply({ embeds: [embed] });
  }
};
