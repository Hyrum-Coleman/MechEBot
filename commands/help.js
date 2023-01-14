const { SlashCommandBuilder } = require('discord.js');
// make command /help which will show all commands and their descriptions

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all available commands!'),
    async execute(interaction) {
        // get all commands
        const commands = interaction.client.commands;
        // create a string to hold all commands
        let commandList = '';
        // loop through all commands
        for (const command of commands.values()) {
            // add the command's name and description to the string
            commandList += `/${command.data.name} - ${command.data.description}\n`;
        }
        await interaction.reply({content: commandList, ephemeral: true})
    },
};