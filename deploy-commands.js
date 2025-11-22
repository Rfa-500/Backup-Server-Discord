const fs = require("fs");
const { REST, Routes } = require("discord.js");
const { token, clientId } = require("./config.json");

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(f=>f.endsWith(".js"));

for(const file of commandFiles){
  const cmd = require(`./commands/${file}`);
  if(cmd.data) commands.push(cmd.data);
}

const rest = new REST({version:"10"}).setToken(token);

(async()=>{
  try{
    console.log("Registrando comandos…");
    await rest.put(Routes.applicationCommands(clientId), {body:commands});
    console.log("Listo.");
  }catch(e){console.error(e);}
})();