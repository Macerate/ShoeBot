module.exports = (client, message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(client.config.prefix)) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return;

	let score = client.getScore.get(message.author.id, message.guild.id);

	if (!score) {
		score = {
			id: `${message.guild.id}-${message.author.id}`,
			user: message.author.id,
			guild: message.guild.id,
			points: 0,
			level: 1
		}
	}

	cmd.run(client, message, args);
};
