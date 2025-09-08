const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const logger = require('../utils/logger');

module.exports = {
  name: 'play',
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play YouTube link in voice channel')
    .addStringOption(o => o.setName('url').setDescription('YouTube URL').setRequired(true)),
  async execute({ interaction }) {
    const url = interaction.options.getString('url');
    const member = interaction.member;
    const vc = member.voice.channel;
    if (!vc) return interaction.reply({ content: 'Masuk voice channel dulu', ephemeral: true });
    await interaction.reply({ content: 'Mencoba memutar...' });
    try {
      const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
      const resource = createAudioResource(stream);
      const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Play } });
      player.play(resource);
      const conn = joinVoiceChannel({
        channelId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator
      });
      conn.subscribe(player);
      logger.log('music', `Playing ${url} in ${vc.guild.name}`);
    } catch (err) {
      logger.log('error', `Music play error: ${err}`);
      interaction.followUp({ content: 'Gagal memutar.' });
    }
  }
};
