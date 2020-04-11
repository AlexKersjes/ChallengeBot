module.exports = {
	name: 'stop',
	description: 'Stop the currently queued challenge',
	admin: 'true',
	execute(message, args, client)
	{
		if(args[0])
		{
			if (args[0] == 'hard')
			{
				client.CurrentChallenge.NextChallenge = null;
			}
		}
		client.CurrentChallenge.finish(client);
	},
};