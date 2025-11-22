const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

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
    .setName("server-lock")
    .setDescription("Oculta todo el servidor excepto el canal #backup-wait (solo lectura).")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guild = interaction.guild;
    const everyone = guild.roles.everyone;

    const backupWait = await ensureBackupWaitChannel(guild);

    await interaction.reply("🔒 Ocultando servidor (solo #backup-wait quedará visible)...");

    for (const channel of guild.channels.cache.values()) {
      if (channel.id === backupWait.id) {
        await channel.permissionOverwrites.edit(everyone, {
          ViewChannel: true,
          SendMessages: false
        });
      } else {
        await channel.permissionOverwrites.edit(everyone, {
          ViewChannel: false
        });
      }
    }

    await interaction.editReply("✔ Servidor bloqueado. Solo #backup-wait está visible y protegido.");
  }
};
