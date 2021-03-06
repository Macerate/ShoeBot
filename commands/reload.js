exports.run = (client, message, args) => {
	if (message.member.id != client.config.ownerID) {
		message.reply("You don't have permission to do that!");
		return;
	}
	if (args.length == 0) return message.reply("Must provide a command name to reload.");

	const commandName = args[0];

	if (!client.commands.has(commandName)) return message.reply("That command does not exist");

	delete require.cache[require.resolve(`./${commandName}.js`)];

	client.commands.delete(commandName);
	const props = require(`./${commandName}.js`);
	client.commands.set(commandName, props);
	message.reply(`The command \"${commandName}\" has been reloaded`);
};
