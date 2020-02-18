const fs = require('fs');
const Discord = require('discord.js');
const Challenge = require('./challenge.js');
const dotenv = require('dotenv');
dotenv.config();
// eslint-disable-next-line no-var
const challengeChannelId = process.env.CHANNEL;
let challengeChannel;
const prefix = process.env.PREFIX;
const client = new Discord.Client();
client.commands = new Discord.Collection();

importCommands('commands');

client.cooldowns = new Discord.Collection();

client.once('ready', async () =>
{
	challengeChannel = await client.channels.fetch(challengeChannelId);
	console.log('Ready');
});

client.on('message', message =>
{
	console.log(message);
	if(message.cleanContent[0] === prefix && message.member.hasPermission('ADMINISTRATOR') && !message.author.bot)
	{
		// admin commands go here
	}
	else if (message.mentions.has(client.user) && message.cleanContent[0] === '@' && !message.author.bot)
	{
		if(!message.attachments.first())
		{
			return message.channel.send('Please attach an image to submit an entry to the challenge.');
		}

		if (!client.cooldowns.has('submit'))
		{
			client.cooldowns.set('submit', new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = client.cooldowns.get('submit');
		let cooldownAmount = (360) * 1000;

		if (timestamps.has(message.author.id))
		{
			const record = timestamps.get(message.author.id);
			cooldownAmount = record['cooldownAmount'];
			const expirationTime = record['now'] + cooldownAmount;
			if (now < expirationTime)
			{
				const timeLeft = (expirationTime - now);
				let emoji;
				switch (12 - Math.floor(12 * timeLeft / cooldownAmount))
				{
				case 1: emoji = '🕐'; break;
				case 2: emoji = '🕑'; break;
				case 3: emoji = '🕒'; break;
				case 4: emoji = '🕓'; break;
				case 5: emoji = '🕔'; break;
				case 6: emoji = '🕕'; break;
				case 7: emoji = '🕖'; break;
				case 8: emoji = '🕗'; break;
				case 9: emoji = '🕘'; break;
				case 10: emoji = '🕙'; break;
				case 11: emoji = '🕚'; break;
				case 12: emoji = '🕛'; break;
				}
				message.react(emoji);
				return;
			}
		}
		timestamps.set(message.author.id, { now, cooldownAmount });
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


		const embed = new Discord.MessageEmbed;
		embed.setImage(message.attachments.first().url)
			.setTitle(message.content.indexOf(' ') == -1 ? 'Untitled' : message.content.slice(message.content.indexOf(' ')))
			.setDescription(message.member ? `by **${message.member.displayName}**` : `by **${message.author.username}**`)
			.setColor(message.member ? message.member.displayColor : '#000000');
		challengeChannel.send({ embed: embed });
	}
	else if (message.channel.type === 'dm' && !message.author.bot)
	{
		const args = message.content.split(/ +/);
		let commandName;
		try { commandName = args.shift().toLowerCase(); }
		catch { commandName = 'submit'; }

		// Dynamic Commands
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if(!command) { return message.channel.send('Unknown command. Try "help".'); }
		if(command.admin) { return message.channel.send('That command is unavailable.'); }

		// Command Execution
		try
		{
			command.execute(message, args, client);
		}
		catch (error)
		{
			console.error(error);
			message.channel.send(`Error: ${error.message}`);
		}

	}

});


function importCommands(path)
{
	const commandFiles = fs.readdirSync(`${path}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles)
	{
		const command = require(`./${path}/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
		client.commands.set(command.name, command);
	}

}

client.login(process.env.TOKEN);