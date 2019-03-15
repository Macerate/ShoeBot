exports.run = (client, message, args) => {
	if (message.member.permissions.has("KICK_MEMBERS")) {
		if (args.length == 0) {
			message.reply(`Usage: \`${client.config.prefix}kick @(member) (reason)\``).catch(console.error);
		}
		else {
			let member = message.mentions.member.first();
			let reason = args.slice(1).join(" ");
			member.kick(reason).catch(console.error);
		}
	}
	else {
		message.reply("You don't have permission to do that!");
	}
};
