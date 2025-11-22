const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const backup = require("discord-backup");

async function ensureBackupWaitChannel(guild) {
  const everyone = guild.roles.everyone;
  let backupWait = guild.channels.cache.find(
    c => c.name === "backup-wait" && c.type === ChannelType.GuildText
  );

  if (!backupWait) {
    backupWait = await guild.channels.create({
      name: "backup-wait",
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: everyone.id,
          allow: [ PermissionFlagsBits.ViewChannel ],
          deny: [ PermissionFlagsBits.SendMessages ]
        }
      ]
    });
  } else {
    await backupWait.permissionOverwrites.edit(everyone, {
      ViewChannel: true,
      SendMessages: false
    });
  }

  return backupWait;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup-load")
    .setDescription("Restaura un backup por ID, manteniendo nombre, icono y el canal #backup-wait.")
    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("ID del backup")
        .setRequired(true)
    ),

  async execute(interaction) {
    const backupId = interaction.options.getString("id");
    const guild = interaction.guild;

    await interaction.reply("⏳ Restaurando backup... esto puede tardar un poco.");

    try {
      // Aseguramos que backup-wait exista antes de limpiar
      const backupWait = await ensureBackupWaitChannel(guild);

      // Eliminar todos los canales excepto backup-wait
      for (const channel of guild.channels.cache.values()) {
        if (channel.id === backupWait.id) continue;
        await channel.delete().catch(() => {});
      }

      // Volver a asegurar permisos correctos de backup-wait
      await ensureBackupWaitChannel(guild);

      // Restaurar backup SIN tocar nombre ni icono y SIN borrar el guild completo
      await backup.load(backupId, guild, {
        clearGuildBeforeRestore: false,
        restoreServerName: false,
        restoreServerIcon: false
      });

      // Asegurar de nuevo que backup-wait quedó como queremos
      await ensureBackupWaitChannel(guild);

      await interaction.editReply("✔ Backup restaurado sin cambiar nombre, icono y manteniendo #backup-wait con historial.");
    } catch (error) {
      console.error(error);
      await interaction.editReply("❌ Error: ID inválido o no se pudo restaurar el backup.");
    }
  }
};
