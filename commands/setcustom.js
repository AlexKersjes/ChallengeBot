const challenge = require('../challenge.js');
module.exports = {
	name: 'setcustom',
	description: 'Set properties for a custom challenge. Use without arguments for more info.',
	admin: 'true',
	execute(message, args, client)
	{
		if(!args[0])
		{
			message.channel.send('The properties you can set are: \nname, duration, description, theme, restriction, and palette\nthe syntax is as follows: setcustom { ***Your properties here*** }');
			return message.channel.send('Be sure to format a property like this: `"propertyname" : "propertyvalue",`\nDo not forget to use a comma for all properties but the last. Do not use quotation marks for the duration property.\nWhen done, queue it with queue.');
		}
		const options = JSON.parse(message.cleanContent.slice(10));
		client.CustomChallenge = new challenge(client, options);
		message.channel.send(`Challenge preview:\nDuration: ${client.CustomChallenge.Duration} hours`, client.CustomChallenge.createChallengeEmbed());
	},
};