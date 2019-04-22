module.exports = async(client, message) => {

	if (message.author.bot) return;

	const bot = client.user;
	const config = client.config;

	const prefix = message.content.match(new RegExp(`^<@!?${bot.id}> `)) ? message.content.match(new RegExp(`^<@!?${bot.id}> `))[0] : config.prefix;

	if (message.guild) {

		const fullID = `${message.guild.id}-${message.author.id}`;
		const experience = client.experience;
		const aglets = client.aglets;

		if (message.content == (message.content.match(new RegExp(`^<@!?${bot.id}>`)) ? message.content.match(new RegExp(`^<@!?${bot.id}>`))[0] : null)) {
			message.reply(`My current prefix is \`${config.prefix}\``);
		}

		// aglets.ensure(fullID, {
		// 	user: message.author.id,
		// 	guild: message.guild.id,
		// 	aglets: 0
		// });

		if (((await message.channel.fetchMessages({ limit: 2 })).last()).author.id !== message.author.id) {
			const content = message.content;
			await experience.defer;
			experience.ensure(fullID, {
				username: message.author.username,
				displayName: message.member.displayName,
				userID: message.author.id,
				guildID: message.guild.id,
				experience: 0,
				level: 0
			});

			if (experience.get(fullID, "username") != message.author.username) {
				experience.set(fullID, message.author.username, "fullID");
			}
			if (experience.get(fullID, "displayName") != message.member.displayName) {
				experience.set(fullID, message.member.displayName, "displayName");
			}

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

			var xpNeeded = level => (5 * (level ** 2)) + (25 * level) + 100;

			const curLevel = _ => {
				var xp = experience.get(fullID, "experience");
				var level = 0;
				while (xp >= xpNeeded(level)) {
					xp -= xpNeeded(level);
					level++;
				}
				return level;
			};

			if (curLevel > experience.get(fullID, "experience")) {
				message.send(`You are now level ${curLevel()}`);
				experience.set(fullID, curLevel, "experience");
			}
		}
	}

	//Command handler

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);

	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return;

	cmd.run(client, message, args);
};
