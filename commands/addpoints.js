module.exports = {
	name: 'addpoints',
	description: 'Add a number of points to someone\'s score.',
	admin: 'true',
	execute(message, args, client)
	{
		if(message.mentions.users.first())
		{
			const points = parseargs(args);
			client.data.Scores[message.mentions.users.first().id] += points;
			return message.channel.send(`added ${points} points to <@${message.mentions.users.first().id}>`);
		}
	},
};

function parseargs(args)
{
	let points = 0;
	args.forEach(arg =>
	{
		if (!isNaN(parseInt(arg)))
		{
			points = parseInt(arg);
		}
	});
	return points;
}