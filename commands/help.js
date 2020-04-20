module.exports = {
	name: 'help',
	description: 'Shows description and shorthands/aliases for a specific public command.',
	execute(message, args, client)
	{
		if(!args[0])
		{
			let newstring = 'Bot commands:\n';
			for (const command of client.commands)
			{
				if (command[1].disabled) { continue; }
				if (message.channel.type === 'dm' && command[1].admin) { continue; }
				newstring += `**${command[0]}** : ${command[1].description.split('.')[0]}.\n`;
			}
			message.channel.send(newstring);
			return message.delete();
		}
		const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
		if(command)
		{
			if(command.admin)
			{
				if(message.channel.type == 'dm')
				{
					return message.channel.send('command not found.');
				}
			}
			let aliases = '';
			if (command.aliases != undefined)
			{
				command.aliases.forEach(alias =>
				{
					aliases += `'${alias}' `;
				});

			}

			return message.channel.send(`'${command.name}' ${aliases}: ${command.description}`);
		}
		return message.channel.send('command not found.');
	},
};