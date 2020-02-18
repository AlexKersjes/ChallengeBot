const Discord = require('discord.js');
module.exports = Challenge;
class Challenge
{
	constructor(client, options)
	{
		this.Duration = options.duration || 24;
		this.Theme = options.theme || this.randomSelect(client.Themes);
		this.Size = options.size || this.randomSelect(client.Sizes);
		this.Palette = client.Palettes.find(p => options.palette === p.name) || this.randomSelect(client.Palettes);
		this.Description = options.description || undefined;
	}
	start() 
	{
		// post challenge start message
		// start timer
	}
	finish()
	{
		// subtotal all collected scores
		// add scores to totals
		// start new challenge
	}
	createChallengeEmbed()
	{
		// create the challenge post
		const embed = new Discord.embed();
	}
	createScoreEmbed()
	{
		// subtotal scores
	}
	randomSelect(array)
	{
		// put in an array, get a random value from the array
		return array[Math.floor(Math.random() * array.length)];
	}
}