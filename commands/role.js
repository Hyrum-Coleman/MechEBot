const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('manages roles')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('adds a role to a user')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('the role to add')
                        .setRequired(true)
                )

                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('the user to add the role to')
                        .setRequired(true)
                ))
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('removes a role from a user')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('the role to remove')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('the user to remove the role from')
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        try {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'add') {
                const role = interaction.options.getRole('role');
                const user = interaction.options.getUser('user');
                await interaction.guild.members.cache.get(user.id).roles.add(role);
                await interaction.reply({content: `Added ${role} to ${user}`, ephemeral: false});
            } else if (subcommand === 'remove') {
                const role = interaction.options.getRole('role');
                const user = interaction.options.getUser('user');
                await interaction.guild.members.cache.get(user.id).roles.remove(role);
                await interaction.reply({content: `Removed ${role} from ${user}`, ephemeral: false});
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};