const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const logger = require('../utils/logger');

module.exports = async (interactionOrMessage) => {
  // used as select menu interaction handler
  // This file exports both a utility to send a dropdown and the interaction handler.
  if (interactionOrMessage.isStringSelectMenu && interactionOrMessage.isStringSelectMenu()) {
    const interaction = interactionOrMessage;
    const roleId = interaction.values[0];
    try {
      const member = interaction.member;
      await member.roles.add(roleId);
      await interaction.reply({ content: 'Role diberikan!', ephemeral: true });
      logger.log('roles', `Added role ${roleId} to ${member.user.tag}`);
    } catch (err) {
      logger.log('error', err);
      interaction.reply({ content: 'Gagal menambahkan role.', ephemeral: true });
    }
    return;
  }
};

// helper to send dropdown (call from admin with channel send)
module.exports.sendDropdown = async (channel, options = []) => {
  const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('role_select')
        .setPlaceholder('Pilih role...')
        .addOptions(options)
    );
  await channel.send({ content: 'Pilih role kamu:', components: [row] });
};
