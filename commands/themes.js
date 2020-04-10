module.exports = {
	name: 'themes',
	description: 'List all themes.',
	admin: 'true',
	execute(message, args, client)
	{
		let i = 0;
		let string = '';
		client.data.Themes.forEach(element =>
		{
			string += `${++i}: ${element}\n`;
		});
		message.channel.message.send(string);
	},
};