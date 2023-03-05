const { SimpleError, ErrorMessage } = require('../utils/errors');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client){

        try {
    
            try {

                const member = interaction.member;
            
                if(interaction.isChatInputCommand()) {
    
                    const command = client.commands.get(interaction.commandName);
                    if (!command) return;
    
                    //lancement de la commande
                    const commandName = command.data.name;
                    if(!client.commands.has(commandName)) return SimpleError(`Invalid Command (${commandName})`)
    
                        const options = command.options;
                        const permissions = options.permissions;
                        const guild = client.guilds.cache.get(process.env.GUILD_ID);
    
                        //check maintenance
                        if(options.maintenance && !member.permissions.has(PermissionsBitField.Flags.Administrator)) return ErrorMessage(interaction, `Cette commande est en maintenance`);
    
                        //check permissions
                        if(permissions.user != null && !member.permissions.has(permissions.user)) return ErrorMessage(interaction, `Tu n'as pas la permission nécéssaire`);
                        if(permissions.bot != null && !guild.members.cache.get(process.env.CLIENT_ID).permissions.has(permissions.user)) return ErrorMessage(interaction, `Le bot n'a permission nécéssaire`);
    
                        //check si l'utilisateur est plus haut gradé
    
                        //check mp
                        //if(member === null && options.dm === false) return ErrorDmMessage(client, interaction)
    
                    client.commands.get(commandName).execute(interaction, con, client);
    
                }

            } catch (error) {
                console.log('\033[0m[\033[0;31m!\033[0m] ' + `An Error has occured in Startup Command !`);
                return interaction.reply({ content: 'An error as occured !', ephemeral: false })
            }

        } catch {
            console.log('\033[0m[\033[0;31m!\033[0m] ' + `An Error has occured in Loading Command !`);
        }

    }
}