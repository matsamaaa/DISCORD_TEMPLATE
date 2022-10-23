const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete messages !')
        .addNumberOption(option =>
            option.setName('number')
            .setDescription('Choose a number')
            .setRequired(true)),
	execute(interaction, client) {

        try {

            let number = interaction.options.getNumber('number') + 1;
            const member = interaction.member;
    
            //check bot and player permission
            if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'An error as occured !', ephemeral: false })
            if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'An error as occured !', ephemeral: false })
    
            if(number > 99) number = 99;
    
            interaction.channel.bulkDelete(number, true)
            .then(m => {
    
                const e = new EmbedBuilder()
                .setColor('#00FF00')
                .addFields({ name: `🚧\ clear`, value: `**${number - 1}** messages deleted by **${member}**` })
                .setFooter({ text: client.user.username, iconURL: interaction.guild.members.cache.get(client.user.id).displayAvatarURL({ dynamic: true }) })
                .setTimestamp(new Date()) 
                return interaction.reply({ embeds: [e], ephemeral: false }).catch(err => {})
    
            })

        } catch(error) {
            console.log('\033[0m[\033[0;31m!\033[0m] ' + `An Error has occured in Clear Command !`);
        }

	},
};