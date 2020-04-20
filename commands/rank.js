module.exports = {
	name: 'rank',
	description: 'Receive a DM with your rank and season points.',
	execute(message, args, client)
	{
		const sortable = [];
		for (const u in client.data.Scores)
		{ sortable.push([u, client.data.Scores[u]]); }
		sortable.sort((a, b) => b[1] - a[1]);

		const rank = sortable.indexOf(a => a[message.user.id]) + 1;
		const score = client.data.Scores[message.user.id];
		let bonusmessage;
		switch (rank)
		{
		case rank < 4 :
			bonusmessage = 'Congratulations!';
			break;
		case rank < 11 :
			bonusmessage = 'You\'re doing great!';
			break;
		case rank < 21 :
			bonusmessage = 'Keep it up!';
			break;
		default :
			bonusmessage = 'You can do it!';
		}
		return message.channel.send(`You are currently rank ${rank} with ${score} points. ${bonusmessage}`);
	},
};