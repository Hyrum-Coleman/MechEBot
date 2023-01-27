
// require the necessary discord.js classes
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Partials, Events, GatewayIntentBits, } = require('discord.js');
const { ReactionRole } = require("discordjs-reaction-role");
const { token } = require('./config.json');

// create a new Discord client
const client = new Client({
    partials: [Partials.Message, Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds, // These Unresolved variable warnings don't seem to affect the bot
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

const configuration = [
    {
        messageId: "1068241194615832618",
            reaction: "🔥",
        roleId: "1068220342709014620",
    },
    {
        messageId: "1068241194615832618",
            reaction: "⚡",
        roleId: "1068220399113994321",
    },
    {
        messageId: "1068241194615832618",
            reaction: "🧮",
        roleId: "1068220451609919639", },
    {
        messageId: "1068241194615832618",
            reaction: "🤓",
        roleId: "1068220484619087903",
    },
    {
        messageId: "1068241194615832618",
            reaction: "📈",
        roleId: "1068220548812910682",
    },
    {
        messageId: "1068241194615832618",
            reaction: "🏭",
        roleId: "1068220613036081255",
    },
    {
        messageId: "1068241194615832618",
            reaction: "🌊",
        roleId: "1068220684913885215",
    },
    {
        messageId: "1068241194615832618",
            reaction: "🖥️",
        roleId: "1068220738328350760",
    },
    {
        messageId: "1068241194615832618",
            reaction: "📉",
        roleId: "1068220836684779520",
    },
    {
        messageId: "1068241194615832618",
            reaction: "🪨",
        roleId: "1068220979236581438",
    },
    {
        messageId: "1068241194615832618",
        reaction: "🏎️",
        roleId: "1068221013130760322",
    },
    {
        messageId: "1068241194615832618",
            reaction: "🅰️",
        roleId: "1068221061067448320",
    },
];
// create a new reaction role manager (handles events)
const manager = new ReactionRole(client, configuration);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// login to Discord with our app's token
client.login(token);

// stop stuff when the bot is stopped
const destroy = () => {
    manager.teardown();
    client.destroy();
};
process.on("SIGINT", destroy);
process.on("SIGTERM", destroy);