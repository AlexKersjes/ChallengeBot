module.exports = {
	name: 'restrictionadd',
	description: 'Add a restriction.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!message.cleanContent.split(this.name + ' ')[1])
		{
			return message.channel.send('Please give the restriction a name.');
		}
		const restriction = message.cleanContent.split(this.name + ' ')[1];
		client.data.Restrictions.push(restriction);
		message.channel.send('added theme : ' + restriction);
	},
};