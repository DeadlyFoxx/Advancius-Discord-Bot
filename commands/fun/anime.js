const Discord = require("discord.js");
const malScraper = require("mal-scraper");

module.exports.run = async (bot, message, args) => {
    
    const search = `${args}`;

  if(!args[0]) return message.reply("Please provide a title of an anime!")
  
    malScraper.getInfoFromName(search)
    .then((data) => {
        const animeEmbed = new Discord.RichEmbed()
        .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
      .setThumbnail(data.picture)
      .setColor('#ffc1cc') //I personally use bubblegum pink!
      .addField('English Title', data.englishTitle, true)
      .addField('Japanese Title', data.japaneseTitle, true)
      .addField('Type', data.type, true)
      .addField('Episodes', data.episodes, true)
      .addField('Rating', data.rating, true)
      .addField('Aired', data.aired, true)
      .addField('Score', data.score, true)
      .addField('Score Stats', data.scoreStats, true)
      .addField('Link', data.url)
      .setFooter(`mc.advancius.net`,bot.user.displayAvatarURL);
      message.channel.send(animeEmbed);
    })

};


module.exports.help = {
    name: 'anime',   
};
