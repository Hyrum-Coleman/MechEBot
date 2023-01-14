const {Events} = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'Use /help to learn how to use me!'}], status: 'dnd'})
    },
};