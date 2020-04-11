module.exports = {
	name: 'addpalette',
	description: 'Add a palette.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!message.attachments.first())
		{
			return message.channel.send('Attach a palette image.');
		}
		const palette = {};
		palette.name = message.cleanContent.split(this.name + ' ')[1];
		if(!palette.name)
		{
			return message.channel.send('Give the palette a name.');
		}
		palette.url = message.attachments.first().url;
		client.data.Palettes.push(palette);
		message.channel.send('added palette : ' + palette.name);
	},
};