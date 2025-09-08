const { SlashCommandBuilder } = require('discord.js');
const roleDropdown = require('../features/roleDropdown');

module.exports = {
  name: 'dropdown',
  data: new SlashCommandBuilder().setName('dropdown').setDescription('Kirim role dropdown (admin only)'),
  async execute({ client, interaction, message }) {
    if (!interaction) return;
    if (!interaction.member.permissions.has('ManageGuild')) return interaction.reply({ content: 'Butuh permission Manage Guild', ephemeral: true });
    const options = [
      { label: 'Designer', value: process.env.ROLE_DESIGNER || 'role_id_here', description: 'Role Aesthetic' },
      { label: 'Artist', value: process.env.ROLE_ARTIST || 'role_id_here', description: 'Role Artist' }
    ];
    await roleDropdown.sendDropdown(interaction.channel, options);
    await interaction.reply({ content: 'Dropdown dikirim.', ephemeral: true });
  }
};
