
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

// create reactionrole config
const configuration = [
    {
        messageId: "1063994462038138962",
        reaction: "🔥",
        roleId: "1063995008799215627",
    },
    {
        messageId: "1063994462038138962",
        reaction: "⚡",
        roleId: "1064263846421876877",
    },
    {
        messageId: "1063994462038138962",
            reaction: "📚",
        roleId: "1064265271063351356",
    },
    {
        messageId: "1063994462038138962",
        reaction: "📈",
        roleId: "1064264994746794074",
    },
    {
        messageId: "1063994462038138962",
        reaction: "🏭",
        roleId: "1064265140909920317",
    },
    {
        messageId: "1063994462038138962",
            reaction: "🤓",
        roleId: "1064265317242634390",
    },
    {
        messageId: "1063994462038138962",
        reaction: "🌊",
        roleId: "1064265363421921300",
    },
    {
        messageId: "1063994462038138962",
            reaction: "🖥️",
        roleId: "1064265392119349502",
    },
    {
        messageId: "1063994462038138962",
            reaction: "🅰️",
        roleId: "1064266003363680337",
    },
];
// create a new reactionrole manager (handles events)
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