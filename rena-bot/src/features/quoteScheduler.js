const cron = require('node-cron');
const quotes = [
  "Be kind to yourself.",
  "Make today amazing.",
  "Simplify, then add lightness.",
  "Create something aesthetic.",
  "Small steps every day."
];
const logger = require('../utils/logger');

module.exports = (client) => {
  const channelId = process.env.QUOTE_CHANNEL_ID;
  if (!channelId) return;
  // every day at 07:00 Asia/Makassar
  cron.schedule('0 7 * * *', async () => {
    try {
      const ch = await client.channels.fetch(channelId);
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      await ch.send({ content: `☀️ Quote pagi: **${q}**` });
      logger.log('quote', `Posted quote: ${q}`);
    } catch (err) {
      logger.log('error', `Quote scheduler error: ${err}`);
    }
  }, { timezone: 'Asia/Makassar' });
  logger.log('quote', 'Scheduler started (07:00 Asia/Makassar)');
};
