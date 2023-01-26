const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('add-reaction-message').setDescription('add the one time message for class reactions')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            const bot_profile = interaction.client.user.displayAvatarURL();
            const embed = new EmbedBuilder().setTitle('Classes List').setColor(0xe85f09).setThumbnail(bot_profile)
                .setDescription('React to this message to assign yourself roles clicking the buttons below. These roles allow you access to course-specific channels!')
                .addFields([
                    { name: '🔥', value: 'Thermodynamics', inline: true },
                    { name: '⚡', value: 'Electrical Engineering', inline: true },
                    { name: '🧮', value: 'PDEs', inline: true },
                    { name: '🤓', value: 'PDEs + Vector Calc', inline: true },
                    { name: '📈', value: 'Statistics', inline: true },
                    { name: '🏭', value: 'Manufacturing', inline: true },
                    { name: '🌊', value: 'Fluid Mechanics', inline: true },
                    { name: '🖥️', value: 'Numerical Methods', inline: true },
                    { name: '📉', value: 'Lin Al + ODEs', inline: true },
                    { name: '🪨', value: 'Materials Science', inline: true },
                    { name: '🏎️', value: 'Dynamics', inline: true },
                    { name: '🅰️', value: 'All Classes', inline: true }
                ])

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    },
};