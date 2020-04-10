const Discord = require('discord.js');
module.exports = Challenge;
class Challenge
{
	constructor(client, options)
	{
		this.Name = null;
		this.Duration = options.duration || 24;
		this.Theme = options.theme || this.randomSelect(client.Themes);
		this.Size = options.size || this.randomSelect(client.Sizes);
		this.Palette = client.Palettes.find(p => options.palette === p.name) || this.randomSelect(client.Palettes);
		this.Description = options.description || undefined;
		this.Subtotals = {};
	}
	start(client)
	{
		// post challenge start message
		// start timer
		client.CurrentChallenge = this;
	}
	finish(client)
	{
		// subtotal all collected scores
		// add scores to totals
		// start new challenge
		client.commands.save.execute({}, {}, client);
	}
	createChallengeEmbed()
	{
		// create the challenge post
		const embed = new Discord.embed();
		embed.setTitle(this.Name ? this.Name : 'A new challenge');
		embed.addField(`Theme: ${this.Theme}`);
		embed.addField(`Size: ${this.Size}`);
		embed.addField(`Palette: ${this.Palette.name}`);
		embed.setImage(this.Palette.url);
		return embed;
	}
	createListener()
	{

	}
	editScore(userId, value)
	{
		if(!this.Subtotals[userId])
		{ this.Subtotals[userId] = 0; }
		this.Subtotals[userId] += value;
	}
	createScoreEmbed()
	{
		// subtotal scores
		const sortable = [];
		for (const u in this.Subtotals)
		{ sortable.push([u, this.Subtotals[u]]); }
		sortable.sort((a, b) => b[1] - a[1]);

		const embed = new Discord.MessageEmbed();
		embed.setTitle('Challenge Results:');
		let message = '';
		sortable.forEach(score => { message += `<@${score[0]}>: ${score[1]}`; });
		embed.addField(message);
		return embed;
	}
	randomSelect(array)
	{
		// put in an array, get a random value from the array
		return array[Math.floor(Math.random() * array.length)];
	}
}