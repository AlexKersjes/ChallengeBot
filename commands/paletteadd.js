module.exports = {
	name: 'paletteadd',
	description: 'Add a palette.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!message.embeds.first())
		{
			return message.channel.send('Attach a palette image.');
		}
		const palette = {};
		palette.name = message.cleanContent.split(this.name + ' ')[1];
		if(!palette.name)
		{
			return message.channel.send('Give the palette a name.');
		}
		palette.url = message.embeds.first().url;
		client.data.Themes.push(palette);
		message.channel.send('added theme : ' + palette);
	},
};