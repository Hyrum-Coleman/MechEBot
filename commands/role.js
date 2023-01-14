const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('manages roles')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('adds a role to a user')
                .addStringOption((option) =>
                    option
                        .setName('role')
                        .setDescription('the role to add')
                        .setRequired(true)
                        .addChoices(
                            {'name': 'MechE', 'value': '1063531932568268803'},
                        )
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('removes a role from a user')
                .addStringOption((option) =>
                    option
                        .setName('role')
                        .setDescription('the role to remove')
                        .setRequired(true)
                        .addChoices(
                            {'name': 'MechE', 'value': '1063531932568268803'},
                )
        ),
        ),

    async execute(interaction) {
        try {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'add') {
                const role = interaction.options.getString('role');
                const user = interaction.member;
                await interaction.guild.members.cache.get(user.id).roles.add(role);
                await interaction.reply({content: `Added ${role} to ${user}`, ephemeral: false});
            } else if (subcommand === 'remove') {
                const role = interaction.options.getString('role');
                const user = interaction.member
                await interaction.guild.members.cache.get(user.id).roles.remove(role);
                await interaction.reply({content: `Removed ${role} from ${user}`, ephemeral: false});
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};