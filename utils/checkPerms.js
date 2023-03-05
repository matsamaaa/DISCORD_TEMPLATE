function CheckPerm(client, user, permission) {
    const guild = client.guilds.cache.get(user.guild.id);
    const member = guild.members.cache.get(user.id);

    if(!member.permissions.has(permission)) return false;
    else return true;
}

module.exports = { CheckPerm };