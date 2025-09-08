const logger = require('../utils/logger');
const automod = require('../features/autoMod');

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    // automod
    const blocked = automod.check(message);
    if (blocked) {
      try {
        await message.delete();
        message.channel.send({ content: `<@${message.author.id}> Pesan dihapus oleh AutoMod.` });
        logger.log('automod', `Deleted message from ${message.author.tag}: ${message.content}`);
      } catch (err) {
        logger.log('error', `Failed to delete message: ${err}`);
      }
      return;
    }
    // prefix commands simple handler
    if (!message.content.startsWith(client.config.prefix)) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/\s+/);
    const cmdName = args.shift().toLowerCase();
    const cmd = client.commands.get(cmdName);
    if (!cmd) return;
    try {
      await cmd.execute({ client, message, args });
      logger.log('command', `Executed ${cmdName} by ${message.author.tag}`);
    } catch (err) {
      logger.log('error', `Command ${cmdName} error: ${err}`);
      message.reply('Terjadi error saat menjalankan command.');
    }
  });
};
