const Discord = require('discord.js');
class Challenge
{
	constructor(client, options)
	{
		this.Name = options.name || 'Challenge ' + new Date(Date.now()).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
		this.Duration = options.duration || 24;
		this.Theme = options.theme || this.randomSelect(client.data.Themes);
		this.Restriction = options.restriction || this.randomSelect(client.data.Restrictions);
		this.Submissions = {};
		if(options.palette)
		{
			this.Palette = client.data.Palettes.find(p => p.name == options.palette);
			if(this.Palette == undefined)
			{
				this.Palette = this.randomSelect(client.data.Palettes);
			}
		}
		else
		{
			this.Palette = this.randomSelect(client.data.Palettes);
		}
		this.Description = options.description || null;
		this.Subtotals = {};
		this.NextChallenge = null;
		this.Endingtime = null;
	}
	start(client)
	{
		// post challenge start message
		// start timer
		this.Endingtime = Date.now() + this.Duration * 60 * 60 * 1000;
		client.CurrentChallenge = this;
		const embed = this.createChallengeEmbed();
		client.challengeChannel.send(embed);
		setTimeout(() =>
		{
			this.finish(client);
		}, this.Endingtime - Date.now());
		client.user.setActivity('Pixel Challenge!');
		this.StatusUpdater = setInterval(() =>
		{
			let delta = Math.abs(this.Endingtime - Date.now()) / 1000;
			const days = Math.floor(delta / 86400);
			delta -= days * 86400;
			const hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;
			const minutes = Math.floor(delta / 60) % 60;
			delta -= minutes * 60;
			const seconds = delta % 60;
			console.log(`${days ? days + ':' : ''}${hours}:${minutes} Remaining`);
			client.user.setActivity(`${days ? days + ':' : ''}${hours}:${minutes} Remaining`);
		}, 1000 * 60);
	}
	finish(client)
	{
		// subtotal all collected scores
		// add scores to totals
		clearInterval(this.StatusUpdater);
		client.setActivity('Challenge over!~~');
		if(client.CurrentChallenge != this)
		{
			return;
		}
		const embed = this.scoreEmbedAndTotal(client);
		client.challengeChannel.send(embed);

		// start new challenge
		client.commands.get('save').execute({}, {}, client);
		if(this.NextChallenge)
		{
			client.CurrentChallenge = this.NextChallenge;
			if(client.data.Auto)
			{
				client.CurrentChallenge.start(client);
			}
		}
		else if(client.data.Auto)
		{
			this.NextChallenge = new Challenge(client, {});
			this.NextChallenge.start(client);
		}
		else
		{
			client.CurrentChallenge = null;
		}
	}
	createChallengeEmbed()
	{
		// create the challenge post
		const embed = new Discord.MessageEmbed();
		embed.setTitle(this.Name ? this.Name : 'A new challenge');
		embed.addField('Theme:', this.Theme);
		embed.addField('Restriction:', this.Restriction);
		embed.addField('Palette:', this.Palette.name);
		embed.setImage(this.Palette.url);
		return embed;
	}
	createListener(message, userId)
	{
		const filter = (reaction, user) => !user.bot && reaction.emoji.name == 'upvote';
		const collector = message.createReactionCollector(filter, { time : this.Endingtime - Date.now() });
		collector.on('collect', (reaction, user) => { this.Subtotals[userId] = reaction.count; });
	}
	/* editScore(userId, value)
	{
		if(!this.Subtotals[userId])
		{ this.Subtotals[userId] = 0; }
		this.Subtotals[userId] += value;
	}*/
	scoreEmbedAndTotal(client)
	{
		// subtotal scores
		const sortable = [];
		for (const u in this.Subtotals)
		{ sortable.push([u, this.Subtotals[u]]); }
		sortable.sort((a, b) => b[1] - a[1]);

		const embed = new Discord.MessageEmbed();
		embed.setTitle(this.Name + ' finished!');
		let message = '';
		sortable.forEach(score =>
		{
			message += `<@${score[0]}>: ${score[1]}\n`;
			client.data.Scores[score[0]] += score[1];
		});
		if(!message)
		{
			message = 'But nobody came...';
		}
		embed.addField('Scores:', message);
		return embed;
	}
	randomSelect(array)
	{
		// put in an array, get a random value from the array
		const result = array[Math.floor(Math.random() * array.length)];
		return result;
	}
	queue(challenge)
	{
		if (this.NextChallenge == null)
		{
			return this.NextChallenge = challenge;
		}
		this.NextChallenge.queue(challenge);
	}

	dequeue(client)
	{
		if (this.NextChallenge == null)
		{
			return delete client.CurrentChallenge;
		}
		if (this.NextChallenge.NextChallenge == null)
		{
			return delete this.NextChallenge;
		}
		this.NextChallenge.dequeue();
	}
}
module.exports = Challenge;