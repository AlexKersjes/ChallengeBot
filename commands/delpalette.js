module.exports = {
	name: 'delpalette',
	description: 'Delete a palette.',
	admin: 'true',
	execute(message, args, client)
	{
		message.channel.send('deleted palette : ' + client.data.Palette[args[0] - 1].name);
		delete client.data.Palette[args[0] - 1];
		client.data.Palette = client.data.Palette.filter(m => m != undefined);
	},
};