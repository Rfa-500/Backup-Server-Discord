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
    .setName("server-unlock")
    .setDescription("Vuelve a mostrar todos los canales, manteniendo #backup-wait visible pero sin escritura.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guild = interaction.guild;
    const everyone = guild.roles.everyone;

    const backupWait = await ensureBackupWaitChannel(guild);

    await interaction.reply("🔓 Mostrando todos los canales...");

    for (const channel of guild.channels.cache.values()) {
      if (channel.id === backupWait.id) {
        await channel.permissionOverwrites.edit(everyone, {
          ViewChannel: true,
          SendMessages: false
        });
      } else {
        await channel.permissionOverwrites.edit(everyone, {
          ViewChannel: true,
          SendMessages: true
        });
      }
    }

    await interaction.editReply("✔ Servidor desbloqueado. Todos los canales visibles; #backup-wait sigue solo lectura.");
  }
};
