module.exports = {
	name: 'addtheme',
	description: 'Add a theme.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!message.cleanContent.split(this.name + ' ')[1])
		{
			return message.channel.send('Please give the theme a name.');
		}
		const theme = message.cleanContent.split(this.name + ' ')[1];
		client.data.Themes.push(theme);
		message.channel.send('added theme : ' + theme);
	},
};