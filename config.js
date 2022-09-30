module.exports = {
	cmdPerPage: 10, //- Number of commands per page of help command
	adminId: "529251307253530625", //- Replace UserId with the Discord ID of the admin of the bot
	token: process.env.token || "", //- Bot's Token
	clientId: process.env.clientId || "", //- ID of the bot
	clientSecret: process.env.clientSecret || "", //- Client Secret of the bot
	port: 4240, //- Port of the API and Dashboard
	scopes: ["identify", "guilds", "applications.commands"], //- Discord OAuth2 Scopes
	serverDeafen: true, //- If you want bot to stay deafened
	defaultVolume: 100, //- Sets the default volume of the bot, You can change this number anywhere from 1 to 100
	supportServer: "https://discord.gg/sbySMS7m3v", //- Support Server Link
	Issues: "https://github.com/SudhanPlayz/Discord-MusicBot/issues", //- Bug Report Link
	permissions: 277083450689, //- Bot Inviting Permissions
	disconnectTime: 30000, //- How long should the bot wait before disconnecting from the voice channel (in miliseconds). Set to 1 for instant disconnect.
	twentyFourSeven: false, //- When set to true, the bot will never disconnect from the voice channel
	autoQueue: false, //- When set to true, related songs will automatically be added to the queue
	alwaysplay: true, //- When set to true, music will always play no matter if theres no one in voice channel
	debug: true, //- Debug mode
	cookieSecret: "CodingWithSudhan is epic", //- Cookie Secret
	website: "http://localhost:4200", //- without the / at the end
	// You need a lavalink server for this bot to work!!!!
	// Lavalink server; public lavalink -> https://lavalink-list.darrennathanael.com/; create one yourself -> https://darrennathanael.com/post/how-to-lavalink
	nodes: [
		{
			identifier: "Main 1", //- Used for indentifier in stats commands.
			host: "141.148.196.197",
			port: 3000,
			password: "LavaOnMoon",
			retryAmount: 9999999, //- The amount of times to retry connecting to the node if connection got dropped.
			retryDelay: 6000, //- Delay between reconnect attempts if connection is lost.
			secure: false, //- Can be either true or false. Only use true if ssl is enabled!
		  },
		  {
			identifier: "Main 2", //- Used for indentifier in stats commands.
			host: "192.95.42.70",
			port: 25582,
			password: "lavaserver",
			retryAmount: 9999999, //- The amount of times to retry connecting to the node if connection got dropped.
			retryDelay: 6000, //- Delay between reconnect attempts if connection is lost.
			secure: false, //- Can be either true or false. Only use true if ssl is enabled!
		  },
		  {
			identifier: "Fallback", //- Used for indentifier in stats commands.
			host: "140.238.248.156",
			port: 3000,
			password: "kdlavalink",
			retryAmount: 9999999, //- The amount of times to retry connecting to the node if connection got dropped.
			retryDelay: 6000, //- Delay between reconnect attempts if connection is lost.
			secure: false, //- Can be either true or false. Only use true if ssl is enabled!
		  },
	],
	embedColor: "#ffeac8", //- Color of the embeds, hex supported
	presence: {
		// PresenceData object | https://discord.js.org/#/docs/main/stable/typedef/PresenceData
		status: "online", //- You can have online, idle, dnd and invisible (Note: invisible makes people think the bot is offline)
		activities: [
			{
				name: "/help", //- Status Text
				type: "LISTENING", //- PLAYING, WATCHING, LISTENING, STREAMING
			},
		],
	},
	iconURL: "", //- This icon will be in every embed's author field
};
