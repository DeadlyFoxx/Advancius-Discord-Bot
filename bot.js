const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const colors = require("./colors")
const fs = require("fs");
const moment = require("moment");
const random = require('random');
const jsonfile = require('jsonfile');
let prefix = botconfig.prefix;
let ownerID = '417876484372430858';
const active = new Map();
const enmap = require('enmap');

bot.commands = new Discord.Collection();

// Giveaway Manager
const { GiveawaysManager } = require('discord-giveaways');
bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

fs.readdir("./commands/", (err, files) => {
  
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("Couldn't find any commands")
  }


  jsfile.forEach((f, i) =>{
  let props = require (`./commands/${f}`);
  console.log(`${f} loaded!`)
  bot.commands.set(props.help.name, props);

  });
  
});

bot.on("ready", async () => {
  console.log(`Advancius is online!`)
  bot.user.setActivity("mc.advancius.net", {type: "PLAYING"});
})

bot.on("message", async message => {
  //replace channel ID's with Advancius
  if(['687343902608588874', '6696190143106646116'].includes(message.channel.id)) {
  let blacklisted = ['penis','fuck', 'shit', 'sex', 'bitch', 'damn', 'dammit', 'goddamn', 'slut', 'whore', 'retard', 'porn', 'https://discord.gg/', 'pussy', 'cunt', 'kill yourself', 'kys', 'die','ddos', 'aids', 'suicide', 'drugs','asshole'];
  
  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  
  if (foundInText) {
    message.delete();
    message.channel.send('Sorry, that is not allowed!');
  }
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let ops = {
    ownerID: ownerID,
    active: active
  }
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile && message.content[0] === prefix) commandfile.run(bot, message, args, ops);
  
})

bot.on('guildMemberAdd', member  =>{
  
  const channel = member.guild.channels.find(channel => channel.name === "welcome")
  if(!channel) return;
  
  
  member.addRole('687894522684112896');
  // Change with Advancius Member ID ^
  
  member.addRole('688477558982836344');
  // Chance with Advancius Updates ID ^
  
  member.addRole('688477690344374283');
  // Change with Advancius Events ID ^
  
  
channel.send("```New user!```\n" + `**__Welcome ${member} to Advancius!__**\n` + "Make sure to check the rules at <#687821650296700934> and information at <#687821631489572923>\n" + "*__Have a nice stay!__*")

  // Change to Advancius channel id's
  
  // Information id 548977598382866445
  // Rules id 548047859740835840
  
  let Joinembed = new Discord.RichEmbed()
    .setTitle("New Discord User")
    .setColor(colors.green)
    .addField("User", `${member}`)
    .addField("**Account Created at**", `**${moment.utc(member.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm')}**`, true)
    .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL)
    .setTimestamp();
  
  let logChannel = member.guild.channels.find(ch => ch.name === "mod-logs")
    if(!logChannel) return;
    
    logChannel.send(Joinembed);
  
})

bot.on('guildMemberRemove', member  =>{

let LeaveEmbed = new Discord.RichEmbed()
    .setTitle("Discord User Left")
    .setColor(colors.forest)
    .addField("User", `${member}`, false)
    .addField("ID:", `${member.user.id}`, false)
    .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL)
    .setTimestamp();
  
  let logChannel = member.guild.channels.find(ch => ch.name === "mod-logs")
    if(!logChannel) return;
    
    logChannel.send(LeaveEmbed)

})

bot.on("messageUpdate", async(oldMessage, newMessage) => {
    
    if(oldMessage.content === newMessage.content){
      return;
    }
   
    let Editembed = new Discord.RichEmbed()
    .setTitle("Message Edited")
    .setColor(colors.blue)
    .setThumbnail(oldMessage.author.avatarURL)
    .addField("Message Sent By:", `<@${oldMessage.author.id}>`)
    .addField("Edited In:", oldMessage.channel)
    .addField("**Before**", oldMessage.content, false)
    .addField("**After**", newMessage.content, false)
    .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL)
    .setTimestamp();
    
    let logChannel = newMessage .guild.channels.find(ch => ch.name === "mod-logs")
    if(!logChannel) return;
    
    logChannel.send(Editembed)
  
  })
 
bot.on("messageDelete", async message => {
  
      let DeleteEmbed = new Discord.RichEmbed()
      .setTitle("Message Deleted")
      .setColor(colors.cyan)
      .setThumbnail(message.author.avatarURL)
      .addField("Deleted by:",`<@${message.author.id}>`)
      .addField("Deleted In:", message.channel)
      .addField("Message Delete:", message.content)
      .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL)
      .setTimestamp();
  
  let logChannel = message.guild.channels.find(ch => ch.name === "mod-logs")
  if(!logChannel) return;
  
  if(message.author.bot) return;
  
  logChannel.send(DeleteEmbed)
  
  })

bot.on("channelCreate", async (channel) =>{
  
  let ChannelCreateEmbed = new Discord.RichEmbed()
  .setTitle("Channel Created")
  .setColor(colors.orange)
  .addField("Channel Name: " , channel.name)
  .addField("Channel Type: " , channel.type)
  .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL)
  .setTimestamp();
  
  let loggingChannel = channel.guild.channels.find(ch => ch.name === "mod-logs")
  if(!loggingChannel) return;
  
  loggingChannel.send(ChannelCreateEmbed)
  
})


bot.on("roleCreate", async (role) =>{
  
  let NewRoleEmbed = new Discord.RichEmbed()
  .setTitle("New Role")
  .setColor(colors.ocean)
  .addField("Role:" , role.toString(), false)
  .addField("Role ID:", role.id, false)
  .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL)
  .setTimestamp();
  
  let logChannel = role.guild.channels.find(ch => ch.name === "mod-logs")
  if(!logChannel) return;
  
  logChannel.send(NewRoleEmbed)
    
})

bot.on("roleDelete", async (role) =>{
  
  let RoleDeleteEmbed = new Discord.RichEmbed()
  .setTitle("Role Deleted")
  .setColor(colors.ocean)
  .addField("Role:" , role.name, false)
  .addField("Role ID:", role.id, false)
  .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL)
  .setTimestamp();
  
  let logChannel = role.guild.channels.find(ch => ch.name === "mod-logs")
  if(!logChannel) return;
  
  logChannel.send(RoleDeleteEmbed)
  
})
    
bot.login(botconfig.token);
