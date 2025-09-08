# Rena-bot — Aesthetic Discord Bot

Fitur:
- Auto moderation (filter kata kasar / spam sederhana)
- Welcome embed dengan gambar
- Auto post quote setiap jam 07:00 (timezone Asia/Makassar)
- Role dropdown (select menu)
- Verifikasi role dengan tombol
- Music sederhana (YouTube links)
- Logging lengkap (file logs + channel log)
- Modular: setiap command/feature pada file terpisah
- Siap di-host di Railway (jalankan `npm start`)

## Setup
1. Salin `.env.example` menjadi `.env` dan isi variabel:
   - `BOT_TOKEN`, `GUILD_ID`, `WELCOME_CHANNEL_ID`, `LOG_CHANNEL_ID`, `QUOTE_CHANNEL_ID`, `WELCOME_IMAGE_URL`, `PREFIX`, `OWNER_ID`.
2. `npm install`
3. `npm start` (Railway otomatis menjalankan `npm start`)

## Notes
- Quote scheduler menggunakan node-cron dengan timezone `Asia/Makassar`.
- Music fitur sederhana; memutar YouTube link via slash/ prefix command.
- Struktur file rapi di `src/` dan `src/commands`.
