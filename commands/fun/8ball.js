const Discord = module.require("discord.js");

var fortunes = [
  "Yes",
  "No",
  "Maybe",
  "Don't know, Try Again later",
  "Outlook isn't good.",
  "As I see it, yes.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send(
      "Please Enter A Question You Would Like Answered!"
    );
  }
  if (args[0])
    message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
  else message.channel.send("I wasn't able to read that.");
};

module.exports.help = {
  name: "8ball"
};
