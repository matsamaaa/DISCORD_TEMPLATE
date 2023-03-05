const { EmbedBuilder } = require('discord.js');
const { color } = require('../config.json');

function CreateEmbed(client, interaction, colorAsk) {
    const Embed = new EmbedBuilder()
        .setColor(colorAsk ? colorAsk : color)
        .setFooter({ text: client.user.username, iconURL: interaction.guild.members.cache.get(client.user.id).displayAvatarURL({ dynamic: true }) })
        .setTimestamp(new Date())

    return Embed;
}

//pour call un embed : await CreateEmbed(client, interaction); 

module.exports = { CreateEmbed };