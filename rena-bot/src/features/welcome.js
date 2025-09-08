const { EmbedBuilder } = require('discord.js');
const logger = require('../utils/logger');

module.exports = async (member) => {
  const channelId = process.env.WELCOME_CHANNEL_ID;
  if (!channelId) return;
  const ch = await member.guild.channels.fetch(channelId).catch(()=>null);
  if (!ch) return;
  const image = process.env.WELCOME_IMAGE_URL || null;
  const embed = new EmbedBuilder()
    .setTitle('Welcome ✨')
    .setDescription(`Selamat datang, <@${member.id}>!`)
    .setTimestamp()
    .setFooter({ text: member.guild.name });
  if (image) embed.setImage(image);
  await ch.send({ embeds: [embed] });
  logger.log('welcome', `Welcomed ${member.user.tag}`);
};
