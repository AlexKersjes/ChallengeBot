module.exports = {
	name: 'paletteel',
	description: 'Delete a palette.',
	admin: 'true',
	execute(message, args, client)
	{
		message.channel.send('deleted palette : ' + client.data.Palette[args[0] - 1].name);
		delete client.data.Restrictions[args[0] - 1];
	},
};