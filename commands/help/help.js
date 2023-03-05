const { SlashCommandBuilder } = require('@discordjs/builders');
const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { ErrorCommand } = require('../../utils/errors');
const { CreateEmbed } = require('../../utils/embed');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Show all commands !'),
        options: {
            dm: false,
            nsfw: false,
            permissions: {
                user: null,
                bot: null
            },
            maintenance: false,
        },
	async execute(interaction, client) {

        try {

            const member = interaction.member;

            const pageMin = 1;
            let page = 1;
            let folders = [];

            const commandsFolder = fs.readdirSync(`./commands`);
            for(const folder of commandsFolder) folders.push(folder);

            const pageMax = folders.length;
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('help-return')
                        .setLabel('◀')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('help-next')
                        .setLabel('▶')
                        .setStyle(ButtonStyle.Primary),
                );
            interaction.reply({ embeds: [Page(page)], components: [row], ephemeral: false })

            const filter = i => ['help-return', 'help-next'].includes(i.customId) && i.user.id === member.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120 * 1000 });
            
            collector.on('collect', async i => {
                if(i.customId === 'help-return') {
                    if(page > pageMin) --page
                } else {
                    if(page < pageMax) page++
                }
                await interaction.editReply({ embeds: [Page(page)], components: [row] });
            });

            function Page(page) {
                let message = "** **\n";
                const Embed = CreateEmbed(client, interaction)
                .setTitle(`🔎 Help`)
                .setDescription(`all commands are displayed here`)

                const categorie = folders[page - 1];
                fs.readdirSync(`./commands/${categorie}`).filter(file => file.endsWith('.js')).map(cmd => {
                    const command = require(`../${categorie}/${cmd}`);
                    message = message + `\`${command.data.name}\` ▸ *${command.data.description}*\n`
                })
                Embed.addFields({ name: `📖 ${categorie}`, value: message })
                Embed.addFields({ name: '** **', value: `Page  •  ${page}/${pageMax}` })
                return Embed;
            }

        } catch (err) {
            ErrorCommand('test', err);
        }

	},
};