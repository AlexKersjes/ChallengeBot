module.exports = {
	name: 'restrictions',
	description: 'List all restrictions.',
	admin: 'true',
	execute(message, args, client)
	{
		let i = 0;
		let string = '';
		client.data.Restrictions.forEach(element =>
		{
			string += `${++i}: ${element}\n`;
		});
		message.channel.message.send(string);
	},
};