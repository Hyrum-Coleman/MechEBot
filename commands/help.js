const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all available commands!'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('MechEBot Help Menu')
            .setDescription('List of all available commands')
            .setColor(0x18e1ee)
            .setTimestamp(Date.now())
            .addFields([
                {
                    name: '`/help`',
                    value: 'Displays this help menu!',
                },
                {
                    name: '`/ping`',
                    value: 'Replies with Pong!',
                },
                {
                    name: '`/classes <subcommand> <class>`',
                    value: 'subcommands: `office-hours`, `final-exam`\n' +
                        'class: pick from the dropdown menu',
                }
                
            ]);

        await interaction.reply({embeds: [embed]})
    },
};