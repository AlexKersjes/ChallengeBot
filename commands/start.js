const challenge = require('../challenge.js');
module.exports = {
	name: 'start',
	description: 'Start the currently queued challenge',
	admin: 'true',
	execute(message, args, client)
	{
		if(!client.CurrentChallenge)
		{
			client.CurrentChallenge = new challenge(client, {});
		}
		client.CurrentChallenge.start(client);
	},
};