module.exports = (client, message) => {
	if (message.author.bot) return;

	const fullID = `${message.guild.id}-${message.author.id}`;

	if (message.guild) {
		// client.aglets.ensure(fullID, {
		// 	user: message.author.id,
		// 	guild: message.guild.id,
		// 	aglets: 0
		// });
		client.experience.ensure(fullID, {
			user: message.author.id,
			guild: message.guild.id,
			experience: 0,
			level: 0
		});

		const content = message.content;

		for (let punctuation of client.config.grammarList) {
			if ((content.charAt(0) === content.charAt(0).toUpperCase()) || (content.endsWith(punctuation))) {
				client.experience.math(fullID, "+", Math.floor(Math.random() * (7 - 1 + 1)) + 1, "experience");
			}
			else if ((content.charAt(0) === content.charAt(0).toUpperCase()) && (content.endsWith(punctuation))) {
				client.experience.math(fullID, "+", Math.floor(Math.random() * (17 - 8 + 1)) + 8, "experience");
			}
			else
				return;
		}



		// if (checkForGrammar(message.content)) {
		// 	message.reply("Good grammar!");
		// }
	}

	//Command handler

	if (!message.content.startsWith(client.config.prefix)) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return;

	cmd.run(client, message, args);
}
