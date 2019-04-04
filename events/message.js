module.exports = async(client, message) => {
	if (message.author.bot) return;

	const bot = client.user;
	const config = config;

	const fullID = `${message.guild.id}-${message.author.id}`;

	const experience = client.experience;
	const aglets = client.aglets;


	if (message.guild) {

		if (message.isMemberMentioned(bot)) {
			message.reply(`My current prefix is \`${config.prefix}\``);
		}

		// aglets.ensure(fullID, {
		// 	user: message.author.id,
		// 	guild: message.guild.id,
		// 	aglets: 0
		// });

		if ((!message.author.bot) && experience.isReady) {
			experience.ensure(fullID, {
				userID: message.author.id,
				guildID: message.guild.id,
				experience: 0,
				level: 0
			});

		}
		else {
			console.error("Error: Enmap \"experience\" not ready. Cannot update.");
		}


		//No null check needed because the last value in the array will always exist. It will set previousMessage as the message that was currently sent.

		const previousMessage = (await message.channel.fetchMessages({ limit: 2 })).last();

		if (previousMessage.author.id !== message.author.id) {
			console.log("different author");
			const content = message.content;

			for (let punctuation of config.grammarList) {
				if ((content.charAt(0) === content.charAt(0).toUpperCase()) || (content.endsWith(punctuation))) {
					experience.math(fullID, "+", Math.floor(Math.random() * (7 - 1 + 1)) + 1, "experience");
				}
				else if ((content.charAt(0) === content.charAt(0).toUpperCase()) && (content.endsWith(punctuation))) {
					experience.math(fullID, "+", Math.floor(Math.random() * (17 - 8 + 1)) + 8, "experience");
				}
				else
					return;
			}
		}
	}

	//Command handler

	if (!message.content.startsWith(config.prefix)) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return;

	cmd.run(client, message, args);
}
