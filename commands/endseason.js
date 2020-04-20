const Discord = require('discord.js');
module.exports = {
	name: 'endseason',
	admin: true,
	description: 'Post an end of the current season and post the total scores.',
	async execute(message, args, client)
	{
		// subtotal scores
		const sortable = [];
		for (const u in client.data.Scores)
		{ sortable.push([u, client.data.Scores[u]]); }
		sortable.sort((a, b) => b[1] - a[1]);

		const embed = new Discord.MessageEmbed();
		embed.setTitle('Season finished!');
		let newmessage = '';
		sortable.forEach(score =>
		{
			newmessage += `<@${score[0]}>: ${score[1]}\n`;
			client.data.Scores[score[0]] += score[1];
		});
		if(!newmessage)
		{
			message = 'But nobody came...';
		}
		embed.addField('Scores:', newmessage);

		client.data.Scores = {};
		await client.challengeChannel.send(embed);
		message.challengeChannel.send(`Congratulations to <@${sortable[0][0]}> for finishing this season in first place!`).then(m => m.react('👏'));
	},
};