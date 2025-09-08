module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    try {
      const welcome = require('../features/welcome');
      await welcome(member);
    } catch (err) {
      console.error('welcome error', err);
    }
  });
};
