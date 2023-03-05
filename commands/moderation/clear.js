const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const { ErrorCommand } = require('../../utils/errors');
const { CreateEmbed } = require('../../utils/embed');
dateFormat = require('dateformat');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete messages (max: 100)  !')
        .addNumberOption(option =>
            option.setName('number')
            .setDescription('Choose a number')
            .setRequired(true)),
        options: {
            dm: false,
            nsfw: false,
            permissions: {
                user: PermissionsBitField.Flags.ManageMessages,
                bot: PermissionsBitField.Flags.ManageMessages
            },
            maintenance: false,
        },
	execute(interaction, client) {

        try {

            let number = interaction.options.getNumber('number');
            const member = interaction.member;
            if(number > 99) number = 99;
            interaction.channel.bulkDelete(number, true)
            .then(() => {
                const Embed =  CreateEmbed(client, interaction)
                .addFields({ name: `🚧 Clear`, value: `**${member}** just deleted **${number}** messages` })
                interaction.reply({ embeds: [Embed], ephemeral: false })            })

        } catch (err) {
            ErrorCommand('clear', err);
        }

	},
};