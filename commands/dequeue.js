const challenge = require('../challenge.js');
module.exports = {
	name: 'dequeue',
	description: 'Dequeue the last challenge made with setcustom.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!client.CurrentChallenge)
		{
			if(client.CurrentChallenge.NextChallenge == null)
			{
				return message.channel.send('No custom challenge to dequeue.');
			}
		}
		client.CurrentChallenge.dequeue(client);
		message.channel.send('Dequeued.');
	},
};