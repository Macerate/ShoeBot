module.exports = (client, message) => {
	console.log("Successfully loaded!".rainbow.bold.underline + `\nPrefix: \"${client.config.prefix}\"`.bold);
}
