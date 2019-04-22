exports.run = async(client, message, args) => {
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        var amount = 0;
        if (args[0] === "s") {
            amount = parseInt(args[1], 10);
        }
        else {
            amount = parseInt(args, 10);
        }
        if ((amount < 1) || (amount > 100)) {
            await message.reply(`Usage: \`${client.config.prefix}clear (amount between 1-100, inclusive)\``).catch(console.error);
            return;
        }
        try {
            await message.channel.bulkDelete(amount)
                .then(messages => {
                    if (messages.size === 1) {
                        message.channel.send(`Deleted ${messages.size} message.`).then(message => message.delete(3500)).catch(error => console.error(error));

                    }
                    else {
                        message.channel.send(`Deleted ${messages.size} messages.`).then(message => message.delete(3500)).catch(error => console.error(error));

                    }
                })
                .catch(error => console.error(error));
        }
        catch (err) {
            console.error(`Error: ${err}`);
        }
    }
    else {
        message.reply("You don't have permission to do that!");
    }
};
