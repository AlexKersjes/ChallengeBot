module.exports = {
	name: 'palettes',
	description: 'List all palettes.',
	admin: 'true',
	execute(message, args, client)
	{
		let i = 0;
		let string = '';
		client.data.Palettes.forEach(element =>
		{
			string += `${++i}: ${element.name}\n`;
		});
		message.channel.message.send(string);
	},
};