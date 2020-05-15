module.exports = {
	name: 'rank',
	description: 'Receive a DM with your rank and season points.',
	execute(message, args, client)
	{
		const sortable = [];
		for (const u in client.data.Scores)
		{ sortable.push([u, client.data.Scores[u]]); }
		sortable.sort((a, b) => b[1] - a[1]);

		const object = sortable.filter(o => o[0] == message.author.id);
		console.log(object);
		const rank = sortable.indexOf(object[0]) + 1;
		console.log(rank);
		if(!client.data.Scores[message.author.id])
		{
			message.channel.send('You have not yet participated in challenges.');
			return client.data.Scores[message.author.id] = 0;
		}
		const score = client.data.Scores[message.author.id];
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