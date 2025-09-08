const badWords = ['fuck','shit','bitch','anjing','ngentot']; // contoh, edit sesuai kebutuhan
module.exports = {
  check: (message) => {
    const content = message.content.toLowerCase();
    for (const w of badWords) {
      if (content.includes(w)) return true;
    }
    // simple spam: too many mentions
    if ((message.mentions.users.size || 0) > 5) return true;
    return false;
  }
};
