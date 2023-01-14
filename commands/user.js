const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, and their ID is ${interaction.user.id}`);
    },
};