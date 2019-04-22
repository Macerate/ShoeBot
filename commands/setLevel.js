exports.run = async(client, message, args) => {
    if (message.member.id != message.guild.ownerID) {
        message.reply("You don't have permission to do that!");
        return;
    }
    const fullID = `${message.guild.id}-${message.author.id}`;
    const experience = client.experience;
    await experience.defer;
    experience.ensure(fullID, {
        username: message.author.username,
        displayName: message.member.displayName,
        userID: message.author.id,
        guildID: message.guild.id,
        experience: 0,
        level: 0
    });
    var xpNeeded = args => (5 * (args ** 2)) + (25 * args) + 100;
};
