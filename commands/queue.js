const challenge = require('../challenge.js');
module.exports = {
	name: 'queue',
	description: 'Queue the challenge made with setcustom.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!client.CustomChallenge)
		{
			return message.channel.send('No custom challenge to queue.');
		}
		if(!client.CurrentChallenge)
		{
			client.CurrentChallenge = client.CustomChallenge;
			delete client.CustomChallenge;
			return message.channel.send('Queued.');
		}
		client.CurrentChallenge.queue(client.CustomChallenge);
		delete client.CustomChallenge;
		message.channel.send('Queued.');
	},
};