const { SlashCommandBuilder } = require('@discordjs/builders');
const { ErrorCommand } = require('../../utils/errors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies pong !'),
        options: {
            dm: false,
            nsfw: false,
            permissions: {
                user: null,
                bot: null
            },
            maintenance: false,
        },
	execute(interaction, client) {

        try {

			return interaction.reply('pong !')

        } catch (err) {
            ErrorCommand('test', err);
        }

	},
};
