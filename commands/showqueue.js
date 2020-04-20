const challenge = require('../challenge.js');
module.exports = {
	name: 'showqueue',
	description: 'Print out the current queue.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!client.CurrentChallenge)
		{
			return message.channel.send('No queue to show.');
		}
		recursiveprint(message, client.CurrentChallenge);
	},
};
function recursiveprint(message, recursivechallenge)
{
	message.channel.send(`Challenge preview:\nDuration: ${recursivechallenge.Duration} hours`, recursivechallenge.createChallengeEmbed());
	if(recursivechallenge.NextChallenge)
	{
		recursiveprint(message, recursivechallenge.NextChallenge);
	}
}