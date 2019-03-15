const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const colors = require("colors");
const SQLite = require("better-sqlite3");
const config = require("./config.json");

const sql = new SQLite('./scores.sqlite');
const client = new Discord.Client();

client.config = config;
client.sql = sql;

//Load Events

fs.readdir("./events/", (err, files) => {

	console.log("Attempting to load events...".bold.yellow);

	if (err) return console.error(err.red.bold);

	files.forEach(file => {
		if (!file.endsWith(".js")) return;

		const event = require(`./events/${file}`);

		let eventName = file.split(".")[0];

		console.log(`Attempting to load event ${eventName}...`.yellow);

		client.on(eventName, event.bind(null, client));

		delete require.cache[require.resolve(`./events/${file}`)];

		console.log(`Event \"${eventName}\" loaded!`.green);
	});
	console.log(`All events loaded successfully!`.green.bold);
});

//Load commands

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {

	console.log("Attempting to load commands...".bold.yellow);

	if (err) return console.error(err);

	files.forEach(file => {
		if (!file.endsWith(".js")) return;

		let props = require(`./commands/${file}`);

		let commandName = file.split(".")[0];

		console.log(`Attempting to load command ${commandName}...`.yellow);

		client.commands.set(commandName, props);

		console.log(`Event \"${commandName}\" loaded!`.green);
	});
	console.log(`All commands loaded successfully!`.green.bold);
});

client.login(config.token);
