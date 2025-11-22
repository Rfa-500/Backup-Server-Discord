const { SlashCommandBuilder } = require("discord.js");
const backup = require("discord-backup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup-now")
    .setDescription("Crea un backup del servidor actual (sin nombre ni icono del servidor)."),

  async execute(interaction) {
    await interaction.reply("⏳ Creando backup…");

    try {
      const guild = interaction.guild;

      const backupData = await backup.create(guild, {
        jsonBeautify: true,
        saveImages: "base64",
        doNotBackup: ["server-name", "server-icon"]
      });

      await interaction.editReply(`✔ Backup creado!  
ID: \`${backupData.id}\``);

    } catch (error) {
      console.error(error);
      await interaction.editReply("❌ Error creando el backup.");
    }
  }
};
