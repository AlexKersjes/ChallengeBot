const fs = require('fs');
module.exports = {
	name: 'save',
	description: 'Save all current data',
	admin: 'true',
	execute(message, args, client)
	{
		const rawdata = JSON.stringify(client.data);
		fs.writeFileSync('data.json', rawdata);
		client.channels.resolve(process.env.ADMINCHANNEL).send('Data saved.');
	},
};