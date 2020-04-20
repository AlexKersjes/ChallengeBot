module.exports = {
	name: 'ban',
	description: 'Ban a user by their discord ID.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!args[0])
		{
			return message.channel.send('Provide the ID of the user to ban.');
		}
		if(args[0] == typeof Number && args[0] > 40000000)
		{
			client.data.BannedUsers.push(args[0]);
			return message.channel.send(`Successfully banned <@${args[0]}>`);
			// todo also delete their submissions and scores
		}
		return message.channel.send('Not a valid ID');
	},
};