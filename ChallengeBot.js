const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const challengeChannelId = process.env.CHALLENGECHANNEL;
client.challengeChannel;

// load in Scores, Themes, Sizes, Palettes
client.data = { Scores : {}, Themes : [], Restrictions : [], Palettes : [], Auto : true, BannedUsers:[] };
client.CurrentChallenge = null;

if (fs.existsSync('./data.json'))
{
	client.data = JSON.parse(fs.readFileSync('./data.json'));
}

importCommands('commands');

client.cooldowns = new Discord.Collection();

client.once('ready', async () =>
{
	client.challengeChannel = await client.channels.fetch(challengeChannelId);
	console.log('Ready');
});

client.on('message', message =>
{
	// commands in the admin channel
	if(message.channel.id == process.env.ADMINCHANNEL && !message.author.bot)
	{
		const args = message.content.split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if(!command) { return message.channel.send('Command not found.'); }
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
	// non-admin commands via dm
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
	// submisssions can be done in any channel by tagging the bot and attaching an image
	else if (message.mentions.has(client.user) && message.cleanContent[0] === '@' && !message.author.bot && !message.mentions.everyone)
	{
		if(!message.attachments.first())
		{
			return message.channel.send('Please attach an image to submit an entry to the challenge.');
		}
		if(client.data.BannedUsers.find(n => n == message.author.id))
		{
			return message.channel.send('You are currently banned from submitting to Pixel Challenges.');
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
				message.channel.send(`You cannot use this command for another ${Math.floor(timeLeft / 1000)} seconds.`);
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
		if(client.CurrentChallenge.Submissions[message.author.id])
		{
			client.CurrentChallenge.Submissions[message.author.id].edit(embed);
		}
		else
		{
			client.challengeChannel.send({ embed: embed }).then(m =>
			{
				m.react('698339640847106108');
				client.CurrentChallenge.createListener(m, message.author.id);
				client.Submissions[message.author.id] = m;
			});
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
console.log('logging in');
client.login(process.env.TOKEN);