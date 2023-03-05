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
                        const guild = interaction.guild;
    
                        //check maintenance
                        if(options.maintenance) {
                            const staff = (process.env.STAFF).split(',');
                            let pass = false;
                            for(const user of staff) {
                                if(user === member.id) pass = true;
                            }
                            if(!pass) return ErrorMessage(interaction, `This command is in Maintenance`);
                        } 
    
                        //check permissions
                        if(permissions.user != null && !member.permissions.has(permissions.user)) return ErrorMessage(interaction, `You don't have the permission`);
                        if(permissions.bot != null && !guild.members.cache.get(process.env.BOT_ID).permissions.has(permissions.user)) return ErrorMessage(interaction, `The bot does not have the permission`);
    
                        //check si l'utilisateur est plus haut gradé
    
                        //check mp
                        //if(member === null && options.dm === false) return ErrorDmMessage(interaction)
    
                    client.commands.get(commandName).execute(interaction, client);
    
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