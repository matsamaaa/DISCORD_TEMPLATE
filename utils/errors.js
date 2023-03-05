function SimpleConsole(Annonce) {
    console.log('\033[0m[\033[0;32m✔\033[0m] ' + `${Annonce}`);
}

function SimpleError(Error, err) {
    if(err) console.log(err);
    console.log('\033[0m[\033[0;31m!\033[0m] ' + `${Error}`);
}

function ErrorCommand(CommandName, err) {
    if(err) console.log(err);
    console.log('\033[0m[\033[0;31m!\033[0m] ' + `Une erreure est survenue lors du chargement de la commande ${CommandName}`);
}

/**
 * 
 * @param {Boolean} EditReply - Edit d'une réponse ou non.
 */

function ErrorMessage(interaction, Error, EditReply) {
    if(EditReply) {
        interaction.editReply({ content: `Une Erreur est survenue: ${Error}`, ephemeral: true });
    } else {
        interaction.reply({ content: `Une Erreur est survenue: ${Error}`, ephemeral: true });
    }
}

function ErrorDmMessage(client, interaction, error) {
    const member = client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(interaction.user.id);
    return member.send({ content: error })
}

module.exports = { SimpleConsole, ErrorCommand, SimpleError, ErrorMessage, ErrorDmMessage }