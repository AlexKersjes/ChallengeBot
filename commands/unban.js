module.exports = {
	name: 'unban',
	description: 'Unbanan a user by their discord ID.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!args[0])
		{
			return message.channel.send('Provide the ID of the user to unban.');
		}
		if(args[0] == typeof Number && args[0] > 40000000)
		{
			client.data.BannedUsers = client.data.BannedUsers.filter(u => u != args[0]);
			return message.channel.send(`Successfully unbanned <@${args[0]}>`);
			// todo also delete their submissions and scores
		}
		return message.channel.send('Not a valid ID');
	},
};