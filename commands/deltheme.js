module.exports = {
	name: 'deltheme',
	description: 'Delete a theme.',
	admin: 'true',
	execute(message, args, client)
	{
		message.channel.send('deleted theme : ' + client.data.Themes[args[0] - 1]);
		delete client.data.Themes[args[0] - 1];
		client.data.Themes = client.data.Themes.filter(m => m != undefined);
	},
};