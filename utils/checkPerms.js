function CheckPerm(client, memberId, permission) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = guild.members.cache.get(memberId);

    if(!member.permissions.has(permission)) return false;
    else return true;
}

module.exports = { CheckPerm };