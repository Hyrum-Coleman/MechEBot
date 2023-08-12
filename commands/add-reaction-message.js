const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('add-reaction-message').setDescription('add the one time message for class reactions')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            const bot_profile = interaction.client.user.displayAvatarURL();
            const embed = new EmbedBuilder().setTitle('Classes Addendum').setColor(0xe85f09).setThumbnail(bot_profile)
                .addFields([
                    { name: '🧱', value: 'Mechanics of Mats', inline: true },
                    { name: '🔊', value: 'Professional Comm', inline: true },
                    { name: '🎛️', value: 'Dynamic Systems', inline: true },
                ])

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    },
};