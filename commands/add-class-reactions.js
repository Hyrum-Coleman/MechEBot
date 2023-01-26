const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-class-reactions')
        .setDescription('add reactions to a message for class roles')
        .addStringOption((option) =>
            option
                .setName('message-id')
                .setDescription('the message id to add reactions to')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            const message = await interaction.channel.messages.fetch(interaction.options.getString('message-id'));
            message.react('🔥')
            message.react('⚡')
            message.react('🧮')
            message.react('🤓')
            message.react('📈')
            message.react('🏭')
            message.react('🌊')
            message.react('🖥️')
            message.react('📉')
            message.react('🪨')
            message.react('🏎️')
            message.react('🅰️')


            await interaction.reply({ content: 'Reactions added!', ephemeral: true });
        } catch (error) {
            console.error(error);
        }
    },
};
