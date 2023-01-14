const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction) {
        await interaction.reply(`This server is ${interaction.guild.name}, and its ID is ${interaction.guild.id}`)
    },
};