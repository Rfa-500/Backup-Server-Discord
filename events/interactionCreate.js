module.exports={
  name:"interactionCreate",
  async execute(interaction, client){
    if(!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) return;
    try{
      await command.execute(interaction, client);
    }catch(e){
      console.error(e);
      await interaction.reply({content:"Error ejecutando comando.", ephemeral:true});
    }
  }
};