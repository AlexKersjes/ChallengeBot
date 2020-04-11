module.exports = {
	name: 'auto',
	description: 'Toggle automatic challenge generation.',
	admin: 'true',
	execute(message, args, client)
	{
		client.data.Auto = !client.data.Auto;
		message.channel.send(`Automatic challenge generation: ${client.data.Auto}`);
	},
};