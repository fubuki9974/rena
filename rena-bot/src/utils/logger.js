const fs = require('fs');
const path = require('path');
const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function appendFile(name, text) {
  const file = path.join(LOG_DIR, name + '.log');
  const now = new Date().toISOString();
  fs.appendFileSync(file, `[${now}] ${text}\n`);
}

module.exports = {
  log: (type, text) => {
    appendFile(type, text);
    // also print
    console.log(`[${type.toUpperCase()}] ${text}`);
  }
};
