const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user\'s info you want to see')
                .setRequired(true)),
    async execute(interaction) {
        try{
        const user = interaction.options.getUser('target');
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s info`)
            .setColor(0x96057c)
            .setTimestamp(Date.now())
            .addFields([
                {
                    name: 'Username',
                    value: user.username,
                    inline: true,
                },
                {
                    name: 'Discriminator',
                    value: user.discriminator,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: user.id,
                    inline: true,
                },])
            .addFields([
                {
                    name: 'Joined Discord',
                    value: user.createdAt.toString(),
                    inline: true,
                },
                {
                    name: 'Joined Server',
                    value: interaction.member.joinedAt.toString(),
                    inline: true,
                }
            ])
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        await interaction.reply({embeds: [embed]});
        } catch (error) {
            console.error(error);
        }
    },
};