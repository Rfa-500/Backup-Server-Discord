# 📦 Discord Backup Bot – Indestructible Edition

A **disaster-proof Discord backup system** designed to protect your server from raids, deletion, misconfigurations, or accidental mistakes.  
This bot uses a **standby backup server** + **indestructible channel protection** to ensure your community is always safe.

---

# 🚀 Features

## ⭐ 1. Backup Creation
Creates a backup of:

- 📁 Channels  
- 🗂️ Categories  
- 🔐 Roles & Permissions  
- 🧩 Full server structure  

Backups intentionally **ignore**:

- 🖼️ Server icon  
- 🏷️ Server name  

This ensures your server branding is never overwritten.

---

## ⭐ 2. Backup Restore (Disaster Mode)

When running:

/backup-load <id>


The bot:

- ❌ Deletes **every channel except `backup-wait`**
- ♻️ Restores all structure from the backup
- 🛑 Does **NOT** change name or icon
- 🔒 Recreates and protects `backup-wait`
- 💬 Preserves `backup-wait` message history

---

## ⭐ 3. Lock the Entire Server



/server-lock


This command:

- 👁️ Hides **every** channel
- ✨ Leaves **ONLY** `backup-wait` visible
- ✋ Makes `backup-wait` read-only
- 🛡️ Prevents deletion of `backup-wait`
- 🧱 Protects the server during:
  - Raids  
  - Panic events  
  - Maintenance  
  - Backup preparation  

---

## ⭐ 4. Unlock the Server



/server-unlock


Restores visibility to all channels while keeping `backup-wait` visible and read-only.

---

## ⭐ 5. Indestructible `backup-wait` Channel

The bot guarantees:

- ✔️ It **always exists**  
- ✔️ It is **never deleted**  
- ✔️ Backups cannot remove it  
- ✔️ Restores cannot overwrite it  
- ✔️ Lock/unlock never hides it  
- ✔️ Message history remains intact  

---

# 📁 Commands Overview

### 🔹 `/backup-now`
Create a backup and receive a backup ID.

### 🔹 `/backup-load <id>`
Restore a backup without overwriting name or icon.  
Keeps `backup-wait` safe and untouched.

### 🔹 `/server-lock`
Hide the entire server, leaving **only** `backup-wait` visible.

### 🔹 `/server-unlock`
Reveal all channels again while keeping `backup-wait` in read-only mode.

---

# 🛠️ Installation

## 1️⃣ Clone the repository


git clone https://github.com/YOUR_USER/YOUR_REPO.git


## 2️⃣ Install dependencies


npm install
npm install discord-backup node-fetch@2


## 3️⃣ Configure the bot

Create or edit `config.json`:

```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID"
}

4️⃣ Register slash commands
node deploy-commands.js

5️⃣ Start the bot
node index.js

🔧 Recommended Usage Workflow
🟩 1. Main Server

Use /backup-now whenever you want a fresh snapshot.

🟦 2. Backup Server (Standby Mode)

Prepare it by:

/backup-load <id>
/server-lock


The server becomes hidden, ready for emergencies.

🔥 3. If the Main Server Breaks

Activate the backup:

/server-unlock


Your server instantly becomes operational.

🔐 Important Notes

🚫 The bot never changes server name or icon

🗂️ Backups exclude name & icon permanently

🧱 backup-wait is indestructible

💬 Message history is never lost

🔄 Designed to run 24/7

📝 License

This project can be modified and reused privately.
MIT license recommended.

💬 Need Help?

Feel free to open an Issue or request new features! or dm discord rfa500
