const fs = require("fs");
const path = require("path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(f=>f.endsWith('.js'));
for(const file of commandFiles){
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.data.name, cmd);
}

const eventFiles = fs.readdirSync('./events').filter(f=>f.endsWith('.js'));
for(const file of eventFiles){
  const event = require(`./events/${file}`);
  if(event.once) client.once(event.name, (...args)=>event.execute(...args,client));
  else client.on(event.name, (...args)=>event.execute(...args,client));
}

client.login(token);