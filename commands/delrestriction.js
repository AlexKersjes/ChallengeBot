module.exports = {
	name: 'delrestriction',
	description: 'Delete a restriction.',
	admin: 'true',
	execute(message, args, client)
	{
		message.channel.send('deleted restriction : ' + client.data.Restrictions[args[0] - 1]);
		delete client.data.Restrictions[args[0] - 1];
		client.data.Restrictions = client.data.Restrictions.filter(m => m != undefined);
	},
};