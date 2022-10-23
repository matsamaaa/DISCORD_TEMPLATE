const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies pong !'),
	async execute(interaction) {

		try {
			return interaction.reply('pong !')
		} catch(error) {
			console.log('\033[0m[\033[0;31m!\033[0m] ' + `An Error has occured in Ping Command !`);
		}

	},
};