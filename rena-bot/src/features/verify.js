const logger = require('../utils/logger');

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'verify_button') return;
  try {
    const roleId = process.env.VERIFIED_ROLE_ID;
    if (!roleId) return interaction.reply({ content: 'Verifikasi belum dikonfigurasi.', ephemeral: true });
    await interaction.member.roles.add(roleId);
    await interaction.reply({ content: '🔒 Kamu sudah terverifikasi!', ephemeral: true });
    logger.log('verify', `Verified ${interaction.user.tag}`);
  } catch (err) {
    logger.log('error', `Verify error: ${err}`);
    interaction.reply({ content: 'Gagal verifikasi.', ephemeral: true });
  }
};
