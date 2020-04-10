module.exports = {
	name: 'themedel',
	description: 'Delete a theme.',
	admin: 'true',
	execute(message, args, client)
	{
		message.channel.send('deleted theme : ' + client.data.Themes[args[0] - 1]);
		delete client.data.Themes[args[0] - 1];
	},
};