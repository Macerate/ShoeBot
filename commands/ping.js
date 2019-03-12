exports.run = (client, message, args) => {
    if (message.member.id == client.config.ownerID) {
        message.reply(`Pong! Time taken: ${Date.now() - message.createdTimestamp} ms.`).catch(console.error);
    }
    else {
        message.reply("You don't have permission to do that!");
    }
};
