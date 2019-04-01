exports.run = (client, message, args) => {
    message.reply(`It has been ${message.author.lastMessage.createdTimestamp - message.createdTimestamp} seconds`).catch(console.error);
};
